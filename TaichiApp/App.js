/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { createStackNavigator, StackActions, NavigationActions, createAppContainer } from "react-navigation";
// 注册页面
import Registration from './Component/Registration/Registration';
// 注册详情
import RegistrationD from './Component/RegistrationDetailes/RegistrationDetailes';
// 忘记密码
import ForgotPass from './Component/ForgotPassword/ForgotPassword.js';
// 首页
import HomePage from './Component/Home/Home';
// 通知消息
import Message from './Component/NotificationMessage/NotificationMessage.js';
// 太极文化
import TaichiWh from './Component/Taichiculture/Taichiculture';
// 太极养生
import TaichiPage from './Component/TaichiKeep/TaichiKeep';
// 附近拳师
import NearboxPage from './Component/Nearboxer/Nearboxer.js';
// 附近拳友
import FistnearPage from './Component/Fistnearby/Fistnearby.js';
// 悠然论坛
import CarefreePage from './Component/CarefreeBBS/CarefreeBBS';
// 悠然太极球入门
import YurantaichiPage from './Component/YurantaichiBall/YurantaichiBall.js';
// 悠然太极球课程
import YurantaichiCoursePage from './Component/YurantaichiCourse/YurantaichiCourse.js';
// 悠然头条
import HeadlinePage from './Component/Headlinedetails/Headlinedetails';
// 太极文化详情
import TaichiCultureDetailsPage from './Component/TaichiCultureDetails/TaichiCultureDetails';
// 课程详情
import CourseDetaPage from './Component/CourseDetails/CourseDetails';
// 拳师名片
import BoxerCaPage from './Component/BoxerCard/BoxerCard.android.js';
// 拳友详情
import FistFriendD from './Component/FistFriendDeta/FistFriendDeta'
// 课程详情价格
import CoursedetailspricePage from './Component/Coursedetailsprice/Coursedetailsprice.js';
// 发帖
import PostingPage from './Component/PostingPage/PostingPage';
// 拳师详情
import BoxerDetailsPage from './Component/BoxerDetails/BoxerDetails.js';
// 太极团名片
import TaiJiCardPage from './Component/TaiJiCard/TaiJiCard';
// 系统消息
import SystemMessagePage from './Component/SystemMessage/SystemMessage.js';
// 太极团更多
import TaichigroupMorePage from './Component/TaichigroupMore/TaichigroupMore';
// 名家名师
import FamousTeacherPage from './Component/FamousTeacher/FamousTeacher.js';
// 群成员
import GroupMembersPage from './Component/GroupMembers/GroupMembers';
// 热门主题
import HotTopicPage from './Component/HotTopic/HotTopic.js';
// 帖子详情
import PostDetailsPage from './Component/PostDetails/PostDetails.js';
// 评论详情
import CommentDetailePage from './Component/CommentDetaile/CommentDetaile.js';
// 学员列表
import StudentListPage from './Component/StudentList/StudentList.js';
// xxx太极团
import HTaichiGroupPage from './Component/HTaichiGroup/HTaichiGroup.js';
// 拳师详情
import TboxerDetailsPage from './Component/TboxerDetails/TboxerDetails.js';
// 评论详情2
import CommentDetaileNpPage from './Component/CommentDetaileNp/CommentDetaileNp.js';
// 我的
import Mypage from './Component/MyPage/MyPage';
// 个人中心
import PersonalCenterPage from './Component/PersonalCenter/PersonalCenter';
// 我的太极团
import MyHTaichiGroupPage from './Component/MyHTaichiGroup/MyHTaichiGroup';
// 我的钱包
import MyWalletPage from './Component/MyWallet/MyWallet.js';
// 我的会员
import MymemberPage from './Component/Mymember/Mymember.js';
// 订单管理
import OrderManagementPage from './Component/OrderManagement/OrderManagement';
// 课程订单
import CoursesOrderManagementPage from './Component/CoursesOrderManagement/CoursesOrderManagement';
// 购物车
import ShoppingCartPage from './Component/ShoppingCart/ShoppingCart';
// 我发布的
import IreleasedPage from './Component/Ireleased/Ireleased';
// 关于我们
import AboutUsPage from './Component/AboutUs/AboutUs';
// 设置
import SetupThePage from './Component/SetupThe/SetupThe.js';
// 我的课程(教练)
import IofcoursePage from './Component/Iofcourse/Iofcourse';
//我的课程(学员)
import XuyuanIofcoursePage from './Component/XuyuanIofcourse/XuyuanIofcourse';
// 我的收藏
import MycollectionPage from './Component/Mycollection/Mycollection.js';
// 课节管理
import ClmanagementPage from './Component/Clmanagement/Clmanagement.js';
// 课节管理详情
import ClManageDetailsPage from './Component/ClManageDetails/ClManageDetails.js';
// 填写报考信息
import EnterExaminationPage from './Component/EnterExamination/EnterExamination.js';
// 报考支付
import EntertoPayPage from './Component/EntertoPay/EntertoPay.js';
// 考试记录
import TestRecordsPage from './Component/TestRecords/TestRecords';
// 报考详情
import ClDetailsPage from './Component/ClDetails/ClDetails.js';
// 课程订单支付
import CoursePaymentPage from './Component/CoursePayment/CoursePayment';
// 账号与安全
import AccountSecurityPage from './Component/AccountSecurity/AccountSecurity.js';
// 常驻地址
import PermanentAddressPage from './Component/PermanentAddress/PermanentAddress.js';
// 收货地址
import ShippingAddressPage from './Component/ShippingAddress/ShippingAddress';
// 收货地址2
import ShippingAddress2page from './Component/ShippingAddress2/ShippingAddress2';
// 个人简介
import PersonalProfilePage from './Component/PersonalProfile/PermanentAddress.js';
// 评价
import Evaluation from './Component/EvaluationPage/EvaluationPage';
// 我的留言
import LeaveMessagePage from './Component/LeaveMessage/LeaveMessage.js';
// 创建太极团
import CreateTcGroupPage from './Component/CreateTcGroup/CreateTcGroup';
// 商城
import MallTemplatePage from './Component/MallTemplate/MallTemplate';
// 商品详情
import GoodsDetailsPage from './Component/GoodsDetails/GoodsDetails';
// 订单支付
import OrderPaymentPage from './Component/OrderPayment/OrderPayment';
// 订单支付2
import OrderPaymentPage2 from './Component/OrderPayment2/OrderPayment2';
// 订单详情
import OrderDetailsPage from './Component/OrderDetails/OrderDetails';
// 退款
import RefundPage from './Component/Refund/Refund';
// 练拳
import HisCraftPage from './Component/HisCraft/HisCraft.js';
// 开始练拳
import HisCraftBegin from './Component/HisCraft/HisCraftBegin.js';

// 学员排名
import StudentsListPage from './Component/StudentsList/StudentsList.js';
// 练拳详情
import DetailsCraftPage from './Component/DetailsCraft/DetailsCraft.js';
// 扫码
import SweepYardPage from './Component/SweepYard/SweepYard.js';
// 加载动画组件
import LoadingPage from './Component/LoadingAnimation/LoadingAnimation.js';
// 提交加载
import LoadingNText from './Component/LoadingAnimationN/LoadingAnimationN';
// 空白页
import BlankPagesPage from './Component/BlankPages/BlankPages';
// 地图
import MYmapPage from './Component/MYmap/MYmap';
// 支付成功跳转页
import PaymentAlsoPage from './Component/PaymentAlso/PaymentAlso';
// 我的推广码
import MycodePage from './Component/Mycode/Mycode';
import { NativeModules } from "react-native";
// 选择常驻地址
import MapsPage from './Component/Maps/Maps';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
}

// 注册组件
const TaichiApp = createStackNavigator({
    HomeN: {
        screen: HomePage
    },
    MycodeN:{
        screen:MycodePage
    },
    FistFriendN:{
        screen:FistFriendD
    },
    Registr: {
        screen: Registration
    },
    MypageN: {
        screen: Mypage
    },
    PaymentAlsoN: {
        screen: PaymentAlsoPage
    },
    MYmapPageN: {
        screen: MYmapPage
    },
    RegistrD: {
        screen: RegistrationD
    },
    EvaluationN: {
        screen: Evaluation
    },
    LoadingNT: {
        screen: LoadingNText
    },
    HisCraftN: {
        screen: HisCraftPage
    },
    HisCraftBegin: {
        screen: HisCraftBegin
    },
    RefundN: {
        screen: RefundPage
    },
    MallTemplateN: {
        screen: MallTemplatePage
    },
    LoadingN: {
        screen: LoadingPage
    },
    BlankPagesN: {
        screen: BlankPagesPage
    },
    SweepYardN: {
        screen: SweepYardPage
    },
    MycollectionN: {
        screen: MycollectionPage
    },
    MapsPageN:{
        screen:MapsPage
    },
    TaichiWhN: {
        screen: TaichiWh
    },
    EnterExaminationN: {
        screen: EnterExaminationPage
    },
    TaichiysN: {
        screen: TaichiPage
    },
    DetailsCraftN: {
        screen: DetailsCraftPage
    },
    StudentsListN: {
        screen: StudentsListPage
    },
    OrderDetailsN: {
        screen: OrderDetailsPage
    },
    OrderPaymentN: {
        screen: OrderPaymentPage
    },
    OrderPaymentN2: {
        screen: OrderPaymentPage2
    },
    GoodsDetailsN: {
        screen: GoodsDetailsPage
    },
    BoxerDetailsN: {
        screen: BoxerDetailsPage
    },
    PersonalCenterN: {
        screen: PersonalCenterPage
    },
    CreateTcGroupN: {
        screen: CreateTcGroupPage
    },
    LeaveMessageN: {
        screen: LeaveMessagePage
    },
    TestRecordsN: {
        screen: TestRecordsPage
    },
    ShippingAddress2N: {
        screen: ShippingAddress2page
    },
    ShippingAddressN: {
        screen: ShippingAddressPage
    },
    PersonalProfileN: {
        screen: PersonalProfilePage
    },
    PermanentAddressN: {
        screen: PermanentAddressPage
    },
    AccountSecurityN: {
        screen: AccountSecurityPage
    },
    CoursePaymentN: {
        screen: CoursePaymentPage
    },
    EntertoPayN: {
        screen: EntertoPayPage
    },
    ClDetailsN: {
        screen: ClDetailsPage
    },
    MyWalletN: {
        screen: MyWalletPage
    },
    ClManageDetailsN: {
        screen: ClManageDetailsPage
    },
    ClmanagementN: {
        screen: ClmanagementPage
    },
    IofcourseN: {
        screen: IofcoursePage
    },
    SetupTheN: {
        screen: SetupThePage
    },
    AboutUsN: {
        screen: AboutUsPage
    },
    IreleasedN: {
        screen: IreleasedPage
    },
    ShoppingCartN: {
        screen: ShoppingCartPage
    },
    OrderManagementN: {
        screen: OrderManagementPage
    },
    CoursesOrderManagementPageN: {
        screen: CoursesOrderManagementPage
    },
    MymemberN: {
        screen: MymemberPage
    },
    MyHTaichiGroupN: {
        screen: MyHTaichiGroupPage
    },
    HTaichiGroupN: {
        screen: HTaichiGroupPage
    },
    PostingPageN: {
        screen: PostingPage
    },
    TaiJiCardPageN: {
        screen: TaiJiCardPage
    },
    CommentDetaileNpN: {
        screen: CommentDetaileNpPage
    },
    TboxerDetailsN: {
        screen: TboxerDetailsPage
    },
    StudentListN: {
        screen: StudentListPage
    },
    CommentDetaileN: {
        screen: CommentDetailePage
    },
    PostDetailsN: {
        screen: PostDetailsPage
    },
    HotTopicN: {
        screen: HotTopicPage
    },
    GroupMembersN: {
        screen: GroupMembersPage
    },
    FamousTeacherN: {
        screen: FamousTeacherPage
    },
    TaichigroupMoreN: {
        screen: TaichigroupMorePage
    },
    SystemMessageN: {
        screen: SystemMessagePage
    },
    CoursedetailspriceN: {
        screen: CoursedetailspricePage
    },
    BoxerCardN: {
        screen: BoxerCaPage
    },
    CourseDetaN: {
        screen: CourseDetaPage
    },
    HeadlineN: {
        screen: HeadlinePage
    },
    YurantaichiCourseN: {
        screen: YurantaichiCoursePage
    },
    YurantaichiN: {
        screen: YurantaichiPage
    },
    CarefreeN: {
        screen: CarefreePage
    },
    FistnearN: {
        screen: FistnearPage
    },
    NearboxN: {
        screen: NearboxPage
    },
    ForgotPassN: {
        screen: ForgotPass
    },
    MessageN: {
        screen: Message
    },
    XuyuanIofcoursePageN: {
        screen: XuyuanIofcoursePage
    },
    TaichiCultureDetailsN: {
        screen: TaichiCultureDetailsPage
    }
})
export default createAppContainer(TaichiApp);
