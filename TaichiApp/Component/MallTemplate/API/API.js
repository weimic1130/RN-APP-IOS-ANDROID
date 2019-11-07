//接口前缀
const BASE_URL = 'https://taiji.papaquan.net/taiji';
// const BASE_URL = 'https://taiji.papaquan.net/taiji';
var JFAPI  = {
    // 轮播图 type 2
    adList:BASE_URL+ '/home/adList.do',
    // 商城商品分类接口
    getList:BASE_URL + '/goodsClassify/getList.do',
    // 分类获取对应商品接口 classifyId 分类id length 一页多少条 page 当前页
    getListId:BASE_URL + '/goods/getGoodsList.do',
    // 通过ID获取商品详情接口
    goodsId:BASE_URL + ' /goods/getInfo.do'
};

export { JFAPI };
