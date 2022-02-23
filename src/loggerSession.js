const uuid = require("uuid");

export const loggerSession = (logger, store) => {
    let current = store?.get?.();
    if(!current) {
        current = uuid.v4();
        store?.set?.(current);
    }

    logger.log("session", current);
}