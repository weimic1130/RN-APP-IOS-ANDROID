//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 获取教练
    getCoash: BASE_URL + '/home/coachList.do',
    // 确认报考
    saveKaoshi:BASE_URL + '/userKaoshi/kaoshi.do'

};

export {JFAPI};
