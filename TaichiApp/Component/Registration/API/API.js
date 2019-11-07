//接口前缀
// const BASE_URL = 'http://192.168.1.132:8080/taiji'
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    // 注册
    Register: BASE_URL + '/register/register.do',
    // 获取验证码
    getSmsCode: BASE_URL + "/register/getSmsCode.do",
    // 登录
    loginDo:BASE_URL + "/login/login.do",
    // 更新用户信息
    updateinfo:BASE_URL + '/user/updateInfo.do',
    // oss签名
    ossGetsign:BASE_URL + "/oss/getSign.do",
    // 上传图片地址
    aliyuncs:'taijiqiu.oss-cn-hangzhou.aliyuncs.com.life.taiji',
    // 发布帖子
    saveForum:BASE_URL + '/forum/save.do'
};

export { JFAPI };
