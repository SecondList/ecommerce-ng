export interface BaseResponse {
    message?:string;
    status?:string;
    errors?: any;
    result?: any;
    resultCount?: number;
    page?: number;
    pageCount?:number;
    pageSize?:number;
    totalCount?: number;
}