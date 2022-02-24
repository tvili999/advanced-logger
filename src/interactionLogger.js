export const interactionLogger = (logger) => {
    document.body.addEventListener("click", (e) => {
        logger.log("clickevent", e.target)
    })
}