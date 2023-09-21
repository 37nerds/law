const log = {
    print: (...data: any[]) => {
        console.log(...data);
    },

    info: (...data: any[]) => {
        console.info(data);
    },

    warn: (...data: any[]) => {
        console.warn(data);
    },

    error: (...data: any[]) => {
        console.error(data);
    },
};

export default log;
