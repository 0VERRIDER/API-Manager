export type ResponseDataType<T> = {
    data: T;
    message: string;
    statusCode?: number;
    status?: string;
};

export interface ErrorDataType {
    statusCode: number;
    message: string;
    status: string;
};