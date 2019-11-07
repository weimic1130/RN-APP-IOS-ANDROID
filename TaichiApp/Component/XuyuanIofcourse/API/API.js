//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
   // 我的课程 (教练)
    getMylesson: BASE_URL + '/lesson/getMyLesson.do',
    // 我的课程（学员）
    getXyList: BASE_URL + '/userLesson/getList.do'
};

export { JFAPI };
