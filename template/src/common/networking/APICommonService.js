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
            access_token: "EAAIsZAmUAJBgBADkTgqXqSxkSR5Gleo8VkEZCZBodX3w6BNxJidLxZAeFivZCwqciJHbKNqFbuwQBSJubX5ja3snkcZAmmAYbpdpQSz1rChDLcDMmgT1wfWEKyle4iDCdD7mnoeRdQCaFjMKaqj70kdYhZC2ZBUFySMuq7ZCiMyWoMZAgKZBwCTnDik1gfeV0mJQSZBSvO52GxgkTNozTgOHsFx9BZAPefZBmJKufKL2dYtZC5PGAZDZD",
            code:"611768246215704"
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