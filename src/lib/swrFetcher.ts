// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = async (path: string | string[], ...args: any[]): Promise<any> => fetch(
    Array.isArray(path) ? path.join("") : path,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ...args,
)
    .then(async res => res.json());
