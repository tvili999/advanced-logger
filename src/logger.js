export const logger = (logFn) => {
    return {
        log: (namespace, loglevel, ...args) => {
            logFn(new Date().getTime(), namespace, loglevel, ...args);
        }
    };
}
