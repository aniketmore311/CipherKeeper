//@ts-check

/**@type{import("../../electron/types").electronAPI} */
// @ts-expect-error
let eleAPI = window.electronAPI;

eleAPI.ping().then(resp => console.log(resp))
