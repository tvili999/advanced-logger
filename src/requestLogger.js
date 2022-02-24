export const requestLogger = (logger) => {
    const origFetch = window.fetch;
    if(origFetch) {
        window.fetch = async function(...args) {
            logger.log("fetch", "request", ...args)
            const response = await origFetch(...args);

            (async () => {
                const resp = response.clone();
                const buf = await resp.arrayBuffer();
                logger.log("fetch", "response", {
                    ...resp,
                    buf
                })
            })();

            return response;
        }
    }

    let nextId = 1;
    let oldXHROpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(...args) {
        const id = nextId++;
        logger.log("xhr", id, "request", ...args)
        this.addEventListener('load', function() {
            let response = this.response;
            try {
                response = JSON.parse(response)
            }
            catch{}

            logger.log("xhr", id, "load", {
                readyState: this.readyState,
                headers: this.getAllResponseHeaders().split("\r\n"),
                status: this.status,
                statusText: this.statusText,
                response,
                responseText: this.responseText,
                responseType: this.responseType,
                responseURL: this.responseURL,
            })
        });

        this.addEventListener("error", function() {
            logger.log("xhr", id, "error", {
                readyState: this.readyState,
                timeout: this.timeout,
            })
        })
        this.addEventListener("timeout", function() {
            logger.log("xhr", id, "timeout", {
                readyState: this.readyState,
                timeout: this.timeout,
            })
        })

        return oldXHROpen.apply(this, arguments);
    }
}
