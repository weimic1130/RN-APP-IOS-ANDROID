//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
// 192.168.1.119:8080
// http://192.168.1.132:8080/taiji
var JFAPI = {
    // 获取用户默认收货地址
    userAddress: BASE_URL + '/userAddress/defaultAddress.do',
    // 商品结算查看库存
    goodsSettlement: BASE_URL + '/goods/goodsSettlement.do',
    // 下单接口
    getOrder: BASE_URL + '/goods/getOrder.do',
    // 确认支付接口 参数 batchId （订单ID），userId （用户ID），subject （购买标题），logisticsMoney （运费）
    payment: BASE_URL + '/goods/payment.do',
    // 获取余额接口
    getBalance:BASE_URL + '/user/getBalance.do',
    // 获取未支付订单信息 批次id batchId
    DidNotPayList:BASE_URL + '/goodsOrder/getInfo2.do'
};

export {JFAPI};
