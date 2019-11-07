//接口前缀
// const BASE_URL = 'http://192.168.1.132:8080/taiji'
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    // 学员列表 (teacherId 教练id(userId) lessonId 课程id page pageSize)
    PerList:BASE_URL + '/userLesson/getList2.do'
};

export { JFAPI };
