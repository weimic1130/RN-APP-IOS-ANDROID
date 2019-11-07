//接口前缀
// const BASE_URL = 'http://192.168.1.132:8080/taiji'
const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI  = {
    // 获取详情
    getDetails : BASE_URL+'/notice/getDetails.do',
    // 评论
    saveComment:BASE_URL + '/comment/comment.do',
    // 评论列表
    commentsList:BASE_URL + '/comment/list.do'
};

export { JFAPI };
