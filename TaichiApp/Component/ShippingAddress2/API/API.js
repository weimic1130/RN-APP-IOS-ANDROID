//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 地址列表
    userAddressList : BASE_URL + '/userAddress/list.do',
    // 设置默认地址
    isDefaultAddress: BASE_URL + '/userAddress/isDefault.do'
};

export {JFAPI};
