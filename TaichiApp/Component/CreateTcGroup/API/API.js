//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    // 创建太极图
    saveGroup:BASE_URL + '/groups/save.do',
    // oss签名
    ossGetsign:BASE_URL + "/oss/getSign.do"
};

export { JFAPI };