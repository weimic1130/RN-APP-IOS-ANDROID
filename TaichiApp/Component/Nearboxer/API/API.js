//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 附近拳师列表 userId,userType( 0-附近拳友，1-附近拳师) ,pageSize ,page
    boxerList:BASE_URL + '/home/boxerList.do'

};

export {JFAPI};
