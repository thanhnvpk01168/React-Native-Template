import { ApiConstants } from "./APIConstants";
import { callApi } from "./Helper";

export const headers = {
    "Content-Type": "application/json",

}
export function updateHeader(params) {
    for (var key in params) {
        headers[key] = params[key];
    }
}

export const testAPI = async (data) => {
    const config = {
        url: ApiConstants.VERIFY_OTP,
        headers,
        data: JSON.stringify({
            OTP: "123123"
        })
    };
    let resp = await callApi("post", config);
    return resp;
}

export const testRefreshToken = async (data) => {
    const config = {
        url: ApiConstants.VERIFY_OTP,
        headers,
        data: JSON.stringify({
            OTP: "123123"
        })
    };
    let resp = await callApi("post", config);
    return resp;
}