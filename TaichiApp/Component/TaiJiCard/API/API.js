//接口前缀
// const BASE_URL = 'http://192.168.1.132:8080/taiji'
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    // 太极团详情
    groutGetInfo:BASE_URL + '/groups/getInfo.do',
    // 太极团动态列表
    getForumList:BASE_URL + '/forum/forumlist.do',
    // 获取团成员列表
    getUserList: BASE_URL + '/groups/user/getUserList.do',
    // 申请加入太极团
    joinTaichi:BASE_URL + '/groups/user/apply.do',
    // 解散太极团
    dissolveGroups: BASE_URL + '/groups/user/dissolveGroups.do',
    // 退出太极团
    quitGroup:BASE_URL + "/groups/user/quitGroups.do"

};

export { JFAPI };
