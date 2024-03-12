// @ts-expect-error Ignore error because this works!
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
export const fetcher = async (...args: any[]): Promise<any> => fetch(...args).then(async res => res.json());
