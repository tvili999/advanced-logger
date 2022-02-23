export { logger } from "./logger";
export { webSocketLogger } from "./webSocketLogger"

export { loggerSession } from "./loggerSession"

import { consoleLogger } from "./consoleLogger"
import { globalErrorLogger } from "./globalLogger"
import { requestLogger } from "./requestLogger";

export const loggers = {
    consoleLogger,
    globalErrorLogger,
    requestLogger
}

export const browser = (logger, options) => {
    consoleLogger(logger, options?.console || {
        preserve: ["error", "warn"]
    });
    globalErrorLogger(logger);
    requestLogger(logger);
}