import { builtinMutators } from "./mutators";

export const logger = (logFn, options) => {
    const mutators = [...(options?.mutators || []), ...builtinMutators]
    const logger = {
        log: (...args) => {
            args = [...args].map(arg => {
                for(const mutator of mutators) {
                    try {
                        if(mutator?.test?.(arg))
                            return mutator.mutate(arg);
                    }
                    catch(e) { console.error(e) }
                }
                try {
                    JSON.stringify(arg);
                    return arg;
                }
                catch {
                    return {
                        __jsonerror: "could not stringify json",
                        __toString: arg?.toString?.()
                    }
                }
            })

            logFn(JSON.stringify([new Date().getTime(), ...args]));
        }
    };

    logger.log("loaded")

    return logger;
}
