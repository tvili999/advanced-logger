export const logger = (logFn) => {
    window.__ADVANCED_LOGGER__ = {
        log: (namespace, loglevel, ...args) => {
            logFn(new Date().getTime(), namespace, loglevel, ...args);
        }
    };
}

export const webSocketLogger = (url) => {
    let queue = [];

    let logFn = null;

    let ws = null;
    let timeout = null;
    const tryConnect = () => {
        timeout = null;
        const retry = () => {
            if(ws) ws.close();
            ws = null;
            logFn = null;
            if(!timeout) timeout = setTimeout(tryConnect, 10000);
        }

        try {
            ws = new WebSocket(url);
            ws.onclose = retry;
            ws.onerror = retry;

            ws.onopen = () => {
                logFn = (...item) => ws.send(JSON.stringify([...item]));

                if(queue.length > 0) {
                    let _queue = queue;
                    queue = [];

                    for(const item of _queue)
                        ws.send(JSON.stringify(item));
                }
            }
        }
        catch {
            retry();
        }
    }

    tryConnect();

    return logger((...args) => {
        if(logFn)
            logFn(...args);
        else
            queue.push([...args]);
    });
}

import { consoleLogger } from "./consoleLogger"
import { globalErrorLogger } from "./globalLogger"
import { requestLogger } from "./requestLogger";

export const loggers = {
    consoleLogger,
    globalErrorLogger,
    requestLogger
}