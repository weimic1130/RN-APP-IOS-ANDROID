//接口前缀
// const BASE_URL = 'http://192.168.1.132:8080/taiji'
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    // 名师名家列表
    coachList : BASE_URL + '/home/coachList.do',
    // 拳师详情
    coachDetails:BASE_URL + '/user/getInfo.do'
};

export { JFAPI };
