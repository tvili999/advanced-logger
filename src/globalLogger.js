export const globalErrorLogger = (logger) => {
    window.onerror = (...args) => {
        logger.log("global", ...args)
    }
}
