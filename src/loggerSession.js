export const loggerSession = (config) => {
    let current = config?.get?.();
    if(current && config?.prefix && !current.startsWith(config.prefix))
        current = null;
    if(!current) {
        const date = new Date();
        current = `${config?.prefix || "UNKNOWN"}_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}`;
        config?.set?.(current);
    }

    return current;
}