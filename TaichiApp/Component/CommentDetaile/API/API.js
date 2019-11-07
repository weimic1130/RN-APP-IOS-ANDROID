//接口前缀
// const BASE_URL = 'http://192.168.1.132:8080/taiji'
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    // 获取帖子详情
    getInfo:BASE_URL + '/forum/getInfo.do',
    // 获得评论列表
    getList:BASE_URL + '/comment/list.do',
    // 评论
    savecomment:BASE_URL + '/comment/comment.do'

};

export { JFAPI };
