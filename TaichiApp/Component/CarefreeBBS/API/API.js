//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji'
// const BASE_URL = 'https://taiji.papaquan.net/taiji'
var JFAPI = {
    // 帖子列表 1 论坛 2 太极团
    forumlist: BASE_URL + '/forum/forumlist.do',
    // 顶部太极团列表
    GetAllList:BASE_URL + '/groups/getAllList.do',
    // 点赞
    clickBBS: BASE_URL + '/forum/click.do',
    // 评论
    comment: BASE_URL + '/comment/comment.do'
};

export {JFAPI};
