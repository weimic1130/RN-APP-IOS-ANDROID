//接口前缀
// const BASE_URL = 'http://192.168.1.132:8080/taiji'
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 课程详情
    etBasicLissonInfo: BASE_URL + '/lesson/getBasicLissonInfo.do',
    // 付费课程详情
    etLissonInfo: BASE_URL + '/lesson/getLissonInfo.do'

};

export {JFAPI};
