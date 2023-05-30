/**
 * // ??? wofuer eig ???
 * Internal stored state. Not valid until after at least one call to `setIsSidekickDesktop()`.
 * @type {boolean}
 */
let _isSidekickDesktop; // undefined = not ready yet

/**
 * Tell the `isSidekickDesktop()` whether or not the GUI is running under Sidekick Desktop.
 * @param {boolean} value - the new value which `isSidekickDesktop()` should return in the future.
 */
const setIsSidekickDesktop = function (value) {
    _isSidekickDesktop = value;
};

/**
 * @returns {boolean} - true if it seems like the GUI is running under Sidekick Desktop; false otherwise.
 * If `setIsSidekickDesktop()` has not yet been called, this can return `undefined`.
 */
const isSidekickDesktop = function () {
    return _isSidekickDesktop;
};

/**
 * @returns {boolean} - false if it seems like the GUI is running under Sidekick Desktop; true otherwise.
 */
const notSidekickDesktop = function () {
    return !isSidekickDesktop();
};

export default isSidekickDesktop;
export {
    isSidekickDesktop,
    notSidekickDesktop,
    setIsSidekickDesktop
};
