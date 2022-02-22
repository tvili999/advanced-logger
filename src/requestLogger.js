export const requestLogger = () => {
    if(!window.__ADVANCED_LOGGER__)
        return;

    const origFetch = window.fetch;
    if(origFetch) {
        window.fetch = async function(...args) {
            window.__ADVANCED_LOGGER__.log("fetch", "request", ...args)
            const response = await origFetch(...args);

            (async () => {
                const resp = response.clone();
                const buf = await resp.arrayBuffer();
                window.__ADVANCED_LOGGER__.log("fetch", "response", {
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
        window.__ADVANCED_LOGGER__.log("xhr", id, "request", ...args)
        this.addEventListener('load', function() {
            window.__ADVANCED_LOGGER__.log("xhr", id, "load", {
                readyState: this.readyState,
                status: this.status,
                statusText: this.statusText,
                response: this.response,
                responseText: this.responseText,
                responseType: this.responseType,
                responseURL: this.responseURL,
            })
        });

        this.addEventListener("error", function() {
            window.__ADVANCED_LOGGER__.log("xhr", id, "error", {
                readyState: this.readyState,
                timeout: this.timeout,
            })
        })
        this.addEventListener("timeout", function() {
            window.__ADVANCED_LOGGER__.log("xhr", id, "timeout", {
                readyState: this.readyState,
                timeout: this.timeout,
            })
        })

        return oldXHROpen.apply(this, arguments);
    }
}
