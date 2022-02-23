const shouldPreserve = (preserve, fnName, ...args) => {
    if(!preserve)
        return false;
    if(preserve === true)
        preserve = true;
    else if(typeof preserve === "function")
        preserve = preserve(fnName, ...args);
    else if(typeof preserve === "string")
        preserve = preserve === fnName;
    else if(Array.isArray(preserve))
        preserve = preserve.indexOf(fnName) !== -1;
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

            if(shouldPreserve(options.preserve, fnName, ...args))
                return log(...args);
        }
    }

    setupFn("log");
    setupFn("warn");
    setupFn("error");
    setupFn("info");
}
