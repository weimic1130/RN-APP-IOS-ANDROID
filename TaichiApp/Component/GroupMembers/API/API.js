//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 群成员列表
    getUserList:BASE_URL + '/groups/user/getUserList.do',
    // 移除太极团
    quitGroup:BASE_URL + '/groups/user/quitGroups.do'
};

export {JFAPI};
