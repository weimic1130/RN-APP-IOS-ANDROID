//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 商品详情 goodsId userId
    getInfo: BASE_URL + '/goods/getInfo.do',
    // 新增购物车 详情点击确定后保存当前商品数量 userId,goodsId,specId,num
    saveGoods: BASE_URL + '/shoppingCart/saveGoods.do',
    // 获取购物车 userId
    getShoppingCart: BASE_URL + '/shoppingCart/getShoppingCart.do',
    // 立即购买确认前往支付生成订单(购物车结算也是这个接口)
    getUserDefaultAddres: BASE_URL + '/goods/getUserDefaultAddress.do',
    // 获取评论列表
    getEvaluationList:BASE_URL + '/goodsComment/list.do'
};

export {JFAPI};
