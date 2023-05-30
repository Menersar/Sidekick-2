const { api, type, Extension } = require("scratch-extension");

// const DIGITAL_INPUT = 1;
// const DIGITAL_OUTPUT = 2;
// const LEDPIN = 12;

// const FormSetLed = {
//     'en': 'Set LED Number [LED_NUMBER] [RED_GREEN]',
//     'de': 'Setze LED [LED_NUMBER] [RED_GREEN]',
// };

// menus: {
//     led_numbers: {
//         acceptReporters: true,
//         items: ['1', '2', '3', '4', '5','6', '7', '8', '9']
//     },

//     red_green: {
//         acceptReporters: true,
//         items: ['red', 'green']
//     },
// };

class ExtensionSidekick extends Extension {
  makeMenuFromArray(arr, menuTopic) {
    const menu = [];
    for (const item of arr) {
      menu.push({
        messageId: `sidekickteam.sidekick.menu.${menuTopic}.${item}`,
        // messageId: "sidekickteam.sidekick.menu." + menuTopic + `.${item}`,
        value: item,
      });
    }
    return menu;
  }

  onInit() {
    api.addCategory({
      categoryId: "sidekickteam.sidekick.category",
      messageId: "sidekickteam.sidekick.category",
      color: "#b6d597",
    });

    // api.addBlock({
    //   opcode: "sidekickteam.sidekick.setledcolour",
    //   type: type.BlockType.COMMAND,
    //   messageId: "sidekickteam.sidekick.setledcolour",
    //   categoryId: "sidekickteam.sidekick.category",
    //   param: {
    //     LED_NUMBER: {
    //       type: type.ParameterType.NUMBER,
    //       default: '1',
    //       menu: "led_numbers"
    //     },
    //   },
    //   function: (args) => this.setLEDColor(args.LED_NUMBER),
    // });

    // api.addBlock({
    //   opcode: "sidekickteam.sidekick.helloworld",
    //   type: type.BlockType.COMMAND,
    //   messageId: "sidekickteam.sidekick.helloworld",
    //   categoryId: "sidekickteam.sidekick.category",
    //   function: (args) => this.HelloWorld(),
    // });

    api.addBlock({
      opcode: "sidekickteam.sidekick.setLEDColor",
      type: type.BlockType.COMMAND,
      messageId: "sidekickteam.sidekick.setLEDColor",
      categoryId: "sidekickteam.sidekick.category",
      function: (args) => this.setLEDColor(args.COLOUR, args.LED_NUMBER),
      param: {
        COLOUR: {
          type: type.ParameterType.COLOR,
          default: "#E96848",
        },
        LED_NUMBER: {
          type: type.ParameterType.NUMBER,
          default: "1",
          // menu: "digital_pins"
          // hier dann die echten pins eintragen und bei den locales dann die "übersetzung" in die Nummer an den Steckverbindungen / LEDs
          menu: this.makeMenuFromArray([
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "10",
            "11",
          ], "LED"),
        },
        // JOIN: {
        //   type: type.ParameterType.STRING,
        //   default: "y",
        // },
      },
    });

    // api.menu({

    //   digital_pins: {
    //       acceptReporters: true,
    //       items: ['2', '3', '4', '5', '6', '7', '8', '9',
    //           '10', '11', '12', '13', '14', '15', '16',
    //           '17', '18', '19', '20',
    //           '21', '22', '23', '24', '25', '26', '27']
    //   },
    // });
  }
  onUninit() {
    api.removeCategory("sidekickteam.sidekick.category");
    // api.removeInstance('sidekick');
  }

  //   ReturnValue(VALUE) {
  //     return VALUE;
  //   }

  //   HelloWorld() {
  //     console.log("MOIN!");
  //     alert("MOIN!");
  //   }

  setLEDColor(color, number) {
    if (typeof color == "string") {
      alert("Color: " + color + ", LED-Number: " + parseInt(number));
      //   return parseInt(color.slice(1, 7), 16);
    } else if (typeof color == "number") {
      alert(color + number);
      //   return color;
    } else {
      alert("Error");
      //   return "Error";
    }
  }

  //   setLEDColor(args) {
  //     let ledPin = args["LED_NUMBER"];
  //     ledPin = parseInt(ledPin, 10);
  //     if (pin_modes[ledPin] !== DIGITAL_OUTPUT) {
  //       pin_modes[ledPin] = DIGITAL_OUTPUT;
  //       msg = { command: "set_mode_digital_output", led_number: ledPin };
  //       msg = JSON.stringify(msg);
  //       log.log(msg);
  //       let color = args["RED_GREEN"];
  //       // color = parseInt(color, 10);
  //       msg = { command: "set_led_on", led_number: ledPin, color: color };
  //       msg = JSON.stringify(msg);
  //       log.log(msg);
  //     }
  //   }
  //
}
module.exports = ExtensionSidekick;
