//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 获取验证码
    getSmsCode: BASE_URL + "/register/getSmsCode.do",
    // 修改密码提交
    submitForgetPassword: BASE_URL + '/register/forgetPassword.do'
};

export {JFAPI};
