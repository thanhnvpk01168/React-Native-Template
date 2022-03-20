import { ApiConstants } from "./APIConstants";
import { callApi } from "./Helper";

export const headers = {
    "Content-Type": "application/json",
    'Cache-Control': 'no-cache'

}
export function updateHeader(params) {
    for (var key in params) {
        headers[key] = params[key];
    }
}

export const testAPI = async (data) => {
    const config = {
        endpoint: ApiConstants.VERIFY_OTP,
        headers,
        data: JSON.stringify({
            OTP: "123123"
        })
    };
    let resp = await callApi("post", config);
    return resp;
}

export const authFb = async (data) => {
    const config = {
        endpoint: ApiConstants.AUTH_FB,
        headers,
        data: JSON.stringify({
            access_token: "token",
            code:"123123123"
        })
    };
    let resp = await callApi("post", config);
    return resp;
}

export const testRefreshToken = async (data) => {
    const config = {
        endpoint: ApiConstants.VERIFY_OTP,
        headers,
        data: JSON.stringify({
            OTP: "123123"
        })
    };
    let resp = await callApi("post", config);
    return resp;
}
