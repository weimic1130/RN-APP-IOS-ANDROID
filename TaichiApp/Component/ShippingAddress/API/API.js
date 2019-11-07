//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
// http://192.168.1.132:8080/taiji
var JFAPI = {
   // 保存地址 (修改传id)
    userAddressCreate:BASE_URL + '/userAddress/create.do',
    // 删除地址
    deleteAddress:BASE_URL + '/userAddress/delete.do'
};

export {JFAPI};
