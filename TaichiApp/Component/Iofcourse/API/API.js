//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    //  (教学课程)
    getMylesson: BASE_URL + '/lesson/getMyLesson.do',
    // （学习课程）
    getXyList: BASE_URL + '/userLesson/getList.do'
};

export { JFAPI };
