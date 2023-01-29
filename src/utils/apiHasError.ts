import { APIError } from 'api/types';

export function hasError(response: any): response is APIError {
    let responseParsed = JSON.parse(response);
    return responseParsed && responseParsed.reason;
}
