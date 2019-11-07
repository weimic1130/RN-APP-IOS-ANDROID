//接口前缀
// const BASE_URL = 'http://192.168.1.132:8080/taiji'
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    // 订单列表
    userOrderList : BASE_URL + '/goodsOrder/userOrderList.do',
    // 获取未支付时订单详情
    getInfo2:BASE_URL + '/goodsOrder/getInfo2.do',
    // 获取订单信息接口
    getOrderInfo: BASE_URL + '/goodsOrder/getOrderInfo.do',
    // 取消订单
    cancelOrder:BASE_URL + '/goodsOrder/cancelOrder.do',
    // 确认收货接口
    confirmOrder:BASE_URL + '/goodsOrder/confirm.do',
    // 延长收货接口
    extendedAuto: BASE_URL + '/goodsOrder/auto.do',
    // 删除订单
    deleteOrder: BASE_URL + '/goodsOrder/deleteOrder.do'
};

export { JFAPI };
