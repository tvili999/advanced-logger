export { logger } from "./logger";
export { webSocketLogger } from "./webSocketLogger"

export { loggerSession } from "./loggerSession"

import { consoleLogger } from "./consoleLogger"
import { globalErrorLogger } from "./globalLogger"
import { interactionLogger } from "./interactionLogger";
import { requestLogger } from "./requestLogger";

export const loggers = {
    consoleLogger,
    globalErrorLogger,
    requestLogger,
    interactionLogger
}

export const browser = (logger, options) => {
    logger.session = options?.session ? loggerSession(options.session) : "default";

    consoleLogger(logger, options?.console || {
        preserve: ["error", "warn"]
    });
    globalErrorLogger(logger);
    requestLogger(logger);
    interactionLogger(logger);
}