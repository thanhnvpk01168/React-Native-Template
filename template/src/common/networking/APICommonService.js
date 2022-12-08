import axios from "axios";
import { Platform } from "react-native";
import { GlobalVariants } from "../GlobalVariants";
import { ApiConstants, SERVER_URL } from "./APIConstants";

export const headers = {
    "Content-Type": "application/json",
    "Accept-Language": "en",
    'x-platform': Platform.OS

}
export function updateHeader(params) {
    for (var key in params) {
        headers[key] = params[key];
    }
}

const updateHeaderWithNewToken = () => {
    if (typeof (GlobalVariants.accessToken) === 'string' && GlobalVariants.accessToken?.length > 2) {
        headers['Authorization'] = `Bearer ${GlobalVariants.accessToken}`
    } else {
        try {
            delete headers.Authorization;
        } catch (error) { }
    }
}

const callAPI = async (options) => {
    try {
        options.url = SERVER_URL + options.endpoint
        let resp = await axios(options);
        return { status: true, resp: resp }
    } catch (error) {
        console.log("API error-->", options?.url)
        console.log("API error", error)
        return { status: false, error: error }
    }
}

class APICommonService {
    accountLogin = async (params = {}, newHeaders = {}) => {
        updateHeaderWithNewToken();
        let options = {
            method: "post",
            endpoint: ApiConstants.VERIFY_OTP,
            headers: {
                ...headers,
                ...newHeaders
            },
            data: JSON.stringify(params)
        };
        let resp = await callAPI(options)
        return resp
    };
    checkNetwork = async () => {
        const config = {
            timeout: 4000,
        }
        config.method = "get";
        config.headers = {
            'Cache-Control': 'no-cache',
        };
        config.withCredentials = false;
        config.url = ""
        try {
            let resp = await axios(config);
            return { status: true, resp: resp }
        } catch (error) {
            return { status: false, error: error }
        }
    }
}

export default new APICommonService();

