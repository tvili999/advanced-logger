import { logger } from "./logger";

export const webSocketLogger = (url, session) => {
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

        const send = (...args) => {
            if(ws.readyState === ws.OPEN)
                ws.send(...args);
            else
                retry();
        }

        try {
            ws = new WebSocket(url + (session ? "/" + session : ""));
            ws.onclose = retry;
            ws.onerror = retry;

            ws.onopen = () => {
                logFn = (...item) => send([...item]);

                if(queue.length > 0) {
                    let _queue = queue;
                    queue = [];

                    for(const item of _queue)
                        send(item);
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
