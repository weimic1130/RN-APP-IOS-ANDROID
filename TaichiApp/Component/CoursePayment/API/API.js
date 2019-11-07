//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 购买课程下单 参数 ：userId, lessonId,payType（0-微信支付，1-支付宝支付，2-余额支付）
    getOrder:BASE_URL + '/lesson/getOrder.do',
    // 确认支付接口 参数 ： orderId，userId，subject
    coursePayment:BASE_URL + '/lesson/payment.do',
    // 获取余额接口
    getBalance:BASE_URL + '/user/getBalance.do'
};

export {JFAPI};
