//
//  WxpayModule.m
//  TaichiApp
//
//  Created by 蓝粑粑 on 2019/5/18.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WxpayModule.h"

@implementation WxpayModule
{
  RCTPromiseResolveBlock resolveBlock;
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleWXPay:) name:@"WXPay" object:nil];
  }
  return self;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)handleWXPay:(NSNotification *)aNotification
{
  NSString *errCode =  [aNotification userInfo][@"errCode"];
  NSLog(@"wxpay finished, errCode = %@", errCode);
  resolveBlock(@{ @"errCode": errCode });
}

RCT_EXPORT_METHOD(registerApp:(NSString *)APP_ID) {
  NSLog(@"wxpay registerApp, appID %@", APP_ID);
  [WXApi registerApp:APP_ID];   //向微信注册
}

RCT_EXPORT_METHOD(pay:(NSDictionary *)order
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSLog(@"wxpay pay start");
  resolveBlock = resolve;
  //调起微信支付
  PayReq *req = [[PayReq alloc] init];
  req.partnerId = [order objectForKey:@"partnerid"];
  req.prepayId = [order objectForKey:@"prepayid"];
  req.nonceStr = [order objectForKey:@"noncestr"];
  req.timeStamp = [[order objectForKey:@"timestamp"] intValue];
  req.package = [order objectForKey:@"package"];
  req.sign = [order objectForKey:@"sign"];
  [WXApi sendReq:req];
}

RCT_REMAP_METHOD(isSupported,   // 判断是否支持调用微信SDK
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  if (![WXApi isWXAppInstalled]) resolve(@NO);
  else resolve(@YES);
}

RCT_EXPORT_MODULE(Wxpay);
@end
