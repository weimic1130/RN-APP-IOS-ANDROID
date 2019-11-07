//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 报考详细信息
    getInfo: BASE_URL + '/userKaoshi/getInfo.do',
    // 教练审核报考接口
    coashAudit:BASE_URL + '/userKaoshi/audit.do'
};

export {JFAPI};
