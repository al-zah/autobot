// @flow
const DEFAULT_PORT: number = 8000;

const getPort = (): string | number => {
    if (process.env && (typeof process.env.PORT === 'number' || typeof process.env.PORT === 'string')) {
        return process.env.PORT;
    }

    return DEFAULT_PORT;
};

export default getPort;
