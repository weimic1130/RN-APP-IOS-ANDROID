//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 上传数据
    sportLog_save: BASE_URL + '/sportLog/save.do',
    // 获取数据
    sportLog_getSportData: BASE_URL + '/sportLog/getSportData.do',

    // 获取动作列表
    sportStandard_list: BASE_URL + '/sportStandard/getList.do',
    // 开始练拳
    sportTime_start: BASE_URL + '/sportTime/start.do',
    // 结束练拳
    sportTime_end: BASE_URL + '/sportTime/end.do',
    // 排行榜
    sportSummary_topList: BASE_URL + '/sportSummary/topList.do',
    // 点赞
    sportSummary_up: BASE_URL + '/sportSummary/up.do',

};

export { JFAPI };
