import axios from "axios";
import { headers, testRefreshToken, updateHeader } from "./APICommonService";
import { SERVER_URL } from "./APIConstants";

function await1Senconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 1000);
    });
}
export const isLogoutApp = { status: false };

/**
 * @param {*} config 
 * 
    config = {
        method: 'post' || 'get' || 'put',
        url: "https://xxx.com/api/user",
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ key : "value"})
    };
 */

export const callApi = async (method, config, checkLogoutRequired = true) => {
    let awaitLogout = false
    if (checkLogoutRequired === true) {
        awaitLogout = isLogoutApp.status;
    }
    if (awaitLogout === true) {
        return { status: false, isCancel: true, showAlert: false }
    }
    config.method = method;
    config.headers = headers;
    config.url = `${SERVER_URL + config.url}`

    try {
        //  SUCCESS
        let resp = await axios(config);
        //console.log(`resp---> api---> ${config.url}`);
        //console.log(`data--->: `, resp);
        return awaitLogout ? { status: false, isCancel: true, showAlert: false } : { status: true, resp: resp, isCancel: false }
    } catch (error) {
        //  ERROR
        console.log(`catch---> api---> ${config.url}`);
        console.log(`error--->: `, error);
        let httpCode = -999;
        try {
            httpCode = error.response.status;
        } catch (error) {
            console.log(`catch---> cannot get http code -----> ${config.url}`);
        }

        let respCallback = null;
        switch (httpCode) {
            case -100: //error network
                await await1Senconds();
                respCallback = await callApi(method, config, checkLogoutRequired);
                return awaitLogout ? { status: false, isCancel: true, showAlert: false } : respCallback;

            case 401:
                // let resp = await testRefreshToken();
                if (true === true) {
                    updateHeader({
                        'Authorization': 'Bearer vanthanhOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhY2MzZjRjNi1mNTYwLTQ1ZDYtOWYzNS0wYWMzNTRiNGNmY2QiLCJpc3MiOiJodHRwczovL2VuZHBvaW50LWFwaS5uZXdjcmVhdGlvbi5vcmcuc2ciLCJhdWQiOiJodHRwczovL2VuZHBvaW50LWFwaS5uZXdjcmVhdGlvbi5vcmcuc2cvcmVzb3VyY2VzIiwiZXhwIjoxNjQyNDA1MzE2LCJuYmYiOjE2NDI0MDUwMTYyNTksInNjb3BlIjpbImVtYWlsIiwiZnVsbG5hbWUiLCJsb2dpbm5hbWUiLCJub2FoYXBpLWF0dGVuZGFuY2UiLCJub2FoYXBpLWV2ZW50Iiwib3BlbmlkIiwicHJvZmlsZSIsInVzZXJpZCIsInVzZXJuYW1lIiwibm9haGFwaS11c2VycHJvZmlsZSIsIm5vYWhhcGktYXV0aGVudGljYXRpb24iLCJub2FoYXBpLWFuYWx5dGljcyIsIm5vYWhhcGktYW5ub3VuY2VtZW50Iiwibm9haGFwaS1tZW1iZXIiLCJub2FoYXBpLW5vdGlmaWNhdGlvbiIsIm5vYWhhcGktbWVtYmVyc2hpcCIsIm5vYWhhcGktbmJuY3Byb21vdGlvbiIsIm5vYWhhcGktbm90aWZpY2F0aW9ucyIsIm5vYWhhcGktcm9sZSIsIm5vYWhhcGktdXNlcmFkZHJlc3MiLCJub2FoYXBpLXVzZXJhdHRkbWV0cmljcyIsIm5vYWhhcGktdXNlcnBlcm1pc3Npb24iLCJub2FoYXBpLXZpc2l0b3IiLCJub2FoYXBpLXVzZXJwaWN0dXJlIl0sInVzZXJfaWQiOiI5NjYxOSIsImVtYWlsIjoicGt0QGdreGltLmNvbSIsInBob25lX251bWJlciI6IjkwODE4MTI4MyIsImRlbGl2ZXJ5X2FkZHJlc3MiOiJTRyIsImJpbGxpbmdfYWRkcmVzcyI6IlNHIiwiZnVsbF9uYW1lIjoiVGhhbmggUGhhbSAiLCJzdWIiOiI5NjYxOSIsImF1dGhfdGltZSI6MTY0MjQwNDcxNjI1OSwiaWRwIjoiaWRzcnYiLCJhbXIiOlsicGFzc3dvcmQiXSwidXNlcm5hbWUiOiJOQ0NBUjQwSFRGRGQiLCJpYXQiOjE2NDI0MDQ3MTZ9.xGJCf27k-rH4qHPfEOnvtMS81f_g2N8Mp2khu-Ce105lRj7LWHEr3-BMeex3BP35ZdVlnAB9l6uX9rKbMwHowCoqcSEIxVCAPGfM14WX6XRX0OMWNrEptmxU1H7ZlHuuQPnL69k1eG6_SrXVFrMBEStjNSyvt-ofQrE1K2LnyzSVUE2QLQNayu8csap3KA8fqmYKygWOqQJxMePmjQW_SCHJbG9UVRrI0dCsGjWQIZo4Je7IKvl9JlP7QNbkkGvqAgo9WiDW1hqWAl5F_cO3H1rWO3LoZ8etCv2Rn-VLDkeQBpTwi9Flk8r3-54jTt9-ND0QSUMWSfjrM91fZHHP5w'
                    })
                    await await1Senconds();
                    respCallback = await callApi(method, config, checkLogoutRequired);
                    return awaitLogout ? { status: false, isCancel: true, showAlert: false } : respCallback;
                } else {
                    //logout
                    alert("vvv")
                    isLogoutApp.status = true;
                    return { status: false, isCancel: true, showAlert: false }
                }

            case 403:
                await await1Senconds();
                respCallback = await callApi(method, config, checkLogoutRequired);
                return awaitLogout ? { status: false, isCancel: true, error: JSON.stringify(error), showAlert: true } : respCallback;
            // return { status: false, isCancel: true, error: JSON.stringify(error), showAlert: true };

            default:
                await await1Senconds();
                respCallback = await callApi(method, config, checkLogoutRequired);
                return awaitLogout ? { status: false, isCancel: true, showAlert: false } : respCallback;
        }
    }

}