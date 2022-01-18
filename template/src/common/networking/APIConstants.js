import { AppMode } from "../ConfigApp";

export const DEV_MODE_API = 'https://xxx.com/dev/';
export const STAGING_MODE_API = 'https://xxx.com/stag/';
export const PROD_MODE_API = 'https://xxx.com/prod/';

export const APP_MODE_URL = {
  dev: DEV_MODE_API,
  prod: PROD_MODE_API,
  stag: STAGING_MODE_API,
};

export const SERVER_URL = APP_MODE_URL[AppMode];
export const ApiError = {
  ERROR_NETWORK: -100,
  // BAD_REQUEST:400,             //Lỗi trong quá trình gửi dữ liệu lên máy chủ
  // UNAUTHORIZED:401,            //Tài khoản chưa được xác thực
  // FORBIDDEN:403,               //Bạn không có quyền truy cập chức năng này
  // NOT_FOUND:404,               //Không tìm thấy máy chủ
  // METHOD_NOT_ALLOWED:405,      //Request không đúng
  // NOT_ACCEPTABLE:406,          //Máy chủ không thể đáp ứng yêu cầu
  // PROXY_AUTHENTICATION_REQUIRED:407,   //Bạn chưa xác thực proxy
  // REQUEST_TIMEOUT:408,              //Quá thời gian máy chủ xử lý
  // CONFLICT:409,   //Dữ liệu gửi lên không thống nhất
  // GONE:410,   //Dữ liệu không tồn tại trên máy chủ
  // LENGTH_REQUIRED:411,   //Không thể xác định độ dài dữ liệu gửi lên
  // PRECONDITION_FAILED:412,   //Một số dữ liệu truyền lên không đúng
  // PAYLOAD_TOO_LARGE:413,   //Dữ liệu yêu cầu quá lớn, máy chủ không thể đáp ứng
  // URI_TOO_LONG:414,   //Đường dẫn máy chủ quá lớn
  // URI_TOO_LONG:415,   //Dữ liệu gửi lên không đúng định dạng
  // RANGE_NOT_SATISFIABLE:416,   //Một số dữ liệu truyền lên không thể đáp ứng bởi máy chủ
  // EXPECTATION_FAILED:417,   //Máy chủ không đáp ứng yêu cầu chờ
};
export const ApiConstants = {
  VERIFY_OTP: 'STG/api/verifyotp',
};
