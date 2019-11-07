//
//  AlipayModule.m
//  TaichiApp
//
//  Created by 蓝粑粑 on 2019/5/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AlipayModule.h"
#import <AlipaySDK/AlipaySDK.h>
static NSString *const kOpenURLNotification = @"RCTOpenURLNotification";

@implementation AlipayModule {
  RCTPromiseResolveBlock _resolve;//定义了一个全局的Block
}
- (instancetype)init {
  if (self = [super init]) {
    self->_resolve = nil;//初始化置空
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURL:) name:kOpenURLNotification object:nil];
  }
  return self;
}
- (void)handleOpenURL:(NSNotification *)notification {
  NSString *urlString = notification.userInfo[@"url"];
  NSURL *url = [NSURL URLWithString:urlString];
  NSLog(@"yyyyyyyyy = %@", urlString);
  if ([url.host isEqualToString:@"safepay"]) {
    [AlipaySDK.defaultService processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
      //由于在跳转支付宝客户端支付的过程中，商户app在后台很可能被系统kill了，所以pay接口的callback就会失效，请商户对standbyCallback返回的回调结果进行处理,就是在这个方法里面处理跟callback一样的逻辑
      if (self->_resolve) {
        self->_resolve(resultDic);//接受并返回回调信息
        self->_resolve = nil;
      }
      NSLog(@"processOrderWithPaymentResult = %@", resultDic);
    }];
    
    [AlipaySDK.defaultService processAuth_V2Result:url standbyCallback:^(NSDictionary *resultDic) {
      NSLog(@"processAuth_V2Result = %@", resultDic);
    }];
  }
}
- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}
RCT_EXPORT_METHOD(pay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  //应用注册scheme,在AliSDKDemo-Info.plist定义URL types
  NSString *appScheme = @"TaichiApp";
  self->_resolve = resolve;//跳到支付宝时候  赋值
  [[AlipaySDK defaultService] payOrder:orderInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    self->_resolve = nil;//回调置空
    resolve(resultDic);
  }];
}
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(Alipay);

@end

