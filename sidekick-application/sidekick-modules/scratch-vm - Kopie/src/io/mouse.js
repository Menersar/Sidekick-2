const MathUtil = require('../util/math-util');

class Mouse {
    constructor (runtime) {
        this._x = 0;
        this._y = 0;
        // this._isDown = false;
        /**
         * Press state for [left, midlle, right]
         */
        this._isDown = [false, false, false];
        /**
         * Reference to the owning Runtime.
         * Can be used, for example, to activate hats.
         * @type{!Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * Activate "event_whenthisspriteclicked" hats.
     * @param  {Target} target to trigger hats on.
     * @private
     */
    _activateClickHats (target) {
        // Activate both "this sprite clicked" and "stage clicked"
        // They were separated into two opcodes for labeling,
        // but should act the same way.
        // Intentionally not checking isStage to make it work when sharing blocks.
        // @todo the blocks should be converted from one to another when shared
        this.runtime.startHats('event_whenthisspriteclicked',
            null, target);
        this.runtime.startHats('event_whenstageclicked',
            null, target);
    }

    /**
     * Find a target by XY location
     * @param  {number} x X position to be sent to the renderer.
     * @param  {number} y Y position to be sent to the renderer.
     * @return {Target} the target at that location
     * @private
     */
    _pickTarget (x, y) {
        if (this.runtime.renderer) {
            const drawableID = this.runtime.renderer.pick(x, y);
            for (let i = 0; i < this.runtime.targets.length; i++) {
                const target = this.runtime.targets[i];
                if (target.hasOwnProperty('drawableID') &&
                    target.drawableID === drawableID) {
                    return target;
                }
            }
        }
        // Return the stage if no target was found
        return this.runtime.getTargetForStage();
    }

    /**
     * Mouse DOM event handler.
     * @param  {object} data Data from DOM event.
     */
    postData (data) {
        if (data.x) {
            this._clientX = data.x;
            this._sidekickX = Math.round(MathUtil.clamp(
                480 * ((data.x / data.canvasWidth) - 0.5),
                -240,
                240
            ));
        }
        if (data.y) {
            this._clientY = data.y;
            this._sidekickY = Math.round(MathUtil.clamp(
                -360 * ((data.y / data.canvasHeight) - 0.5),
                -180,
                180
            ));
        }
        if (typeof data.isDown !== 'undefined') {
            const previousDownState = this._isDown[data.button];
            this._isDown[data.button] = data.isDown;

            // Do not trigger if down state has not changed
            if (previousDownState === this._isDown[data.button]) return;

            // Never trigger click hats at the end of a drag
            if (data.wasDragged) return;

            // Do not activate click hats for clicks outside canvas bounds
            if (!(data.x > 0 && data.x < data.canvasWidth &&
                data.y > 0 && data.y < data.canvasHeight)) return;

            const target = this._pickTarget(data.x, data.y);
            const isNewMouseDown = !previousDownState && data.isDown;
            const isNewMouseUp = previousDownState && !data.isDown;

            // Draggable targets start click hats on mouse up.
            // Non-draggable targets start click hats on mouse down.
            if (target.draggable && isNewMouseUp) {
                this._activateClickHats(target);
            } else if (!target.draggable && isNewMouseDown) {
                this._activateClickHats(target);
            }
        }
    }

    /**
     * Get the X position of the mouse in client coordinates.
     * @return {number} Non-clamped X position of the mouse cursor.
     */
    getClientX () {
        return this._clientX;
    }

    /**
     * Get the Y position of the mouse in client coordinates.
     * @return {number} Non-clamped Y position of the mouse cursor.
     */
    getClientY () {
        return this._clientY;
    }

    /**
     * Get the X position of the mouse in sidekick coordinates.
     * @return {number} Clamped and integer rounded X position of the mouse cursor.
     */
    getSidekickX () {
        return this._sidekickX;
    }

    /**
     * Get the Y position of the mouse in sidekick coordinates.
     * @return {number} Clamped and integer rounded Y position of the mouse cursor.
     */
    getSidekickY () {
        return this._sidekickY;
    }

    /**
     * Get the down state of the mouse.
     * @return {boolean} Is the mouse down?
     */
    getIsDown () {
        return this._isDown[0];
    }

    /**
     * Get the down state of the mouse.
     * @param {number} button Button number.
     * @return {boolean} Is the mouse down?
     */
    getMousePressed (button) {
        return this._isDown[button];
    }
}

module.exports = Mouse;
