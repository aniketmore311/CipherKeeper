//@ts-check
let state = {}

module.exports = {
    get: key => state[key],
    set: (key, value) => {
        state[key] = value;
    }
};