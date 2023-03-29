import { APIError } from 'api/types';

function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function hasError(response: any): response is APIError {
    if (response?.reason) {
        return true;
    }

    if (isJsonString(response)) {
        const responseParsed = JSON.parse(response);
        return responseParsed && responseParsed.reason;
    }

    return false;
}
