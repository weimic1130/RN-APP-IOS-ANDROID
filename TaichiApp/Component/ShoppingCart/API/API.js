//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 获取购物车 userId
    getShoppingCart: BASE_URL + '/shoppingCart/getShoppingCart.do',
    // 删除购物车商品接口
    deleteGoods: BASE_URL + "/shoppingCart/deleteGoods.do",
    // 保存下单商品信息
    saveUserDefault:BASE_URL + '/goods/getUserDefaultAddress.do'
};

export {JFAPI};
