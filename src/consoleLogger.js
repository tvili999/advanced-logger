export const consoleLogger = (preserve) => {
    if(!window.__ADVANCED_LOGGER__)
        return;
    const setupFn = (fnName) => {
        const log = console[fnName].bind(console);
        console[fnName] = (...args) => {
            window.__ADVANCED_LOGGER__.log("console", fnName, ...args)
//            window.__ADVANCED_LOGGER__.log("trace", new Error().stack)
            if(preserve)
                return log(...args);
        }
    }

    setupFn("log");
    setupFn("warn");
    setupFn("error");
    setupFn("info");
}
