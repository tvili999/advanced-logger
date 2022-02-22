export const globalErrorLogger = () => {
    if(!window.__ADVANCED_LOGGER__)
        return;

    window.onerror = (...args) => {
        window.__ADVANCED_LOGGER__.log("global", ...args)
    }
}
