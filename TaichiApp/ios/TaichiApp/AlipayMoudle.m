//
//  AlipayMoudle.m
//  TaichiApp
//
//  Created by 蓝粑粑 on 2019/5/8.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import "AlipayMoudle.h"
#import <AlipaySDK/AlipaySDK.h>

@implementation AlipayMoudle

RCT_EXPORT_METHOD(pay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  //应用注册scheme,在AliSDKDemo-Info.plist定义URL types
  NSString *appScheme = @"alisdkdemo";
  [[AlipaySDK defaultService] payOrder:orderInfo fromScheme:appScheme        callback:^(NSDictionary *resultDic) {
    resolve(resultDic);
  }];
}

RCT_EXPORT_MODULE(Alipay);

@end
