import { useEffect } from "react";

const useDelayedFunction = (time: number, callback: Function, dependencies: unknown[]) => {
    useEffect(() => {
        const timeoutId = setTimeout(callback, time);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [callback, ...dependencies]);
};

export default useDelayedFunction;
