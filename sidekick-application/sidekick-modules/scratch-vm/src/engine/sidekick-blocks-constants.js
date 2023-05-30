/**
 * These constants are copied from sidekick-blocks/core/constants.js
 * // ???
 * // !!! TESTEN !!!
 * // !!!
 * @TODO find a way to require() these straight from sidekick-blocks... maybe make a sidekick-blocks/dist/constants.js?
 * @readonly
 * @enum {int}
 */
// ??? "output shape" – was definiert / ist das ???
// !!!
const SidekickBlocksConstants = {
    /**
     * ENUM for output shape: hexagonal (booleans/predicates).
     * @const
     */
    OUTPUT_SHAPE_HEXAGONAL: 1,

    /**
     * ENUM for output shape: rounded (numbers).
     * @const
     */
    OUTPUT_SHAPE_ROUND: 2,

    /**
     * ENUM for output shape: squared (any/all values; strings).
     * @const
     */
    OUTPUT_SHAPE_SQUARE: 3
};

module.exports = SidekickBlocksConstants;
