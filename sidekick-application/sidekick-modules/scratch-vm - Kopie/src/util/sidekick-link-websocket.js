/**
 * // !!! EXTENSION !!!
 * // !!! "with SidekickLink without WebSockets", "public methods in this class" !!!
 * // !!!
 * // !!!
 * This class provides a SidekickLinkSocket implementation using WebSockets,
 * attempting to connect with the locally installed Sidekick-Link.
 *
 * To connect with SidekickLink without WebSockets, you must implement all of the
 * public methods in this class.
 * - open()
 * - close()
 * - setOn[Open|Close|Error]
 * - setHandleMessage
 * - sendMessage(msgObj)
 * - isOpen()
 */
class SidekickLinkWebSocket {
  constructor(type) {
    this._type = type;
    this._onOpen = null;
    this._onClose = null;
    this._onError = null;
    this._handleMessage = null;

    this._ws = null;
  }

  open() {
    if (
      !(this._onOpen && this._onClose && this._onError && this._handleMessage)
    ) {
      throw new Error(
        "Must set open, close, message and error handlers before calling open on the socket"
      );
    }

    // ??? "socket Type" – "BLE", "BT" ???
    // !!! TESTEN !!!
    // !!!
    let pathname;
    switch (this._type) {
      case "BLE":
        pathname = "sidekick/ble";
        break;
      case "BT":
        pathname = "sidekick/bt";
        break;
      default:
        // ???
        // !!!
        throw new Error(`Unknown SidekickLink socket Type: ${this._type}`);
    }

    // Try ws:// (the new way) and wss:// (the old way) simultaneously. If either connects, close the other. If we
    // were to try one and fall back to the other on failure, that could mean a delay of 30 seconds or more for
    // those who need the fallback.
    // If both connections fail we should report only one error.

    const setSocket = (socketToUse, socketToClose) => {
      socketToClose.onopen = socketToClose.onerror = null;
      socketToClose.close();

      this._ws = socketToUse;
      this._ws.onopen = this._onOpen;
      this._ws.onclose = this._onClose;
      this._ws.onerror = this._onError;
      this._ws.onmessage = this._onMessage.bind(this);
    };

    // ??? "ws", "wss" – Bedeutung, Unterschied, etc. ... ???
    // !!!
    const ws = new WebSocket(`ws://127.0.0.1:20111/${pathname}`);
    // ??? "device-manager", muss es "device-manager.scratch.mit.edu" heissen ???
    // ??? UMSCHREIBEN ???
    // !!! TESTEN !!!
    // !!!
    const wss = new WebSocket(
      `wss://device-manager.scratch.mit.edu:20110/${pathname}`
    );

    const connectTimeout = setTimeout(() => {
      // neither socket succeeded before the timeout
      setSocket(ws, wss);
      this._ws.onerror(new Event("timeout"));
    }, 15 * 1000);
    ws.onopen = (openEvent) => {
      clearTimeout(connectTimeout);
      setSocket(ws, wss);
      this._ws.onopen(openEvent);
    };
    wss.onopen = (openEvent) => {
      clearTimeout(connectTimeout);
      setSocket(wss, ws);
      this._ws.onopen(openEvent);
    };

    let wsError;
    let wssError;
    const errorHandler = () => {
      // if only one has received an error, we haven't overall failed yet
      if (wsError && wssError) {
        clearTimeout(connectTimeout);
        setSocket(ws, wss);
        this._ws.onerror(wsError);
      }
    };
    ws.onerror = (errorEvent) => {
      wsError = errorEvent;
      errorHandler();
    };
    wss.onerror = (errorEvent) => {
      wssError = errorEvent;
      errorHandler();
    };
  }

  close() {
    this._ws.close();
    this._ws = null;
  }

  sendMessage(message) {
    const messageText = JSON.stringify(message);
    this._ws.send(messageText);
  }

  setOnOpen(fn) {
    this._onOpen = fn;
  }

  setOnClose(fn) {
    this._onClose = fn;
  }

  setOnError(fn) {
    this._onError = fn;
  }

  setHandleMessage(fn) {
    this._handleMessage = fn;
  }

  isOpen() {
    return this._ws && this._ws.readyState === this._ws.OPEN;
  }

  _onMessage(e) {
    const json = JSON.parse(e.data);
    this._handleMessage(json);
  }
}

module.exports = SidekickLinkWebSocket;
