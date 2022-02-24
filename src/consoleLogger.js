const shouldPreserve = (preserve, fnName, ...args) => {
    if(!preserve)
        return false;
    if(preserve === true)
        return true;
    else if(typeof preserve === "function")
        return preserve(fnName, ...args);
    else if(typeof preserve === "string")
        return preserve === fnName;
    else if(Array.isArray(preserve))
        return preserve.indexOf(fnName) !== -1;
    else if(typeof preserve === "object") {
        return shouldPreserve(preserve[fnName])
    }

    return false;
}

export const consoleLogger = (logger, options) => {
    const setupFn = (fnName) => {
        const log = console[fnName].bind(console);

        console[fnName] = (...args) => {
            logger.log("console", fnName, ...args)

            if(shouldPreserve(options.preserve, fnName, ...args)) {
                return log(...args);
            }
        }
    }

    setupFn("log");
    setupFn("warn");
    setupFn("error");
    setupFn("info");
}
