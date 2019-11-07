//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// https://taiji.papaquan.net/taiji
var JFAPI  = {
    // 购买课程下单 参数 ：userId, lessonId,payType（0-微信支付，1-支付宝支付，2-余额支付）
    getOrder:BASE_URL + '/lesson/getOrder.do',
    // 确认支付接口 参数 ： orderId，userId，subject
    coursePayment:BASE_URL + '/lesson/payment.do',
    // 轮播图
    adList:BASE_URL+ '/home/adList.do',
    // 名师名家列表
    coachList : BASE_URL + '/home/coachList.do',
    // 入门课程列表
    lessonList : BASE_URL + '/home/lessonList.do',
    // 悠然太极球课程
    lessonListId : BASE_URL + '/home/lesson2List.do',
    // 获取余额接口
    getBalance:BASE_URL + '/user/getBalance.do',
    // 悠然头条
    noticeList: BASE_URL + '/home/noticeList.do',
    // 名师名家详情
    coachDetails:BASE_URL + '/user/getInfo.do'

};

export { JFAPI };
