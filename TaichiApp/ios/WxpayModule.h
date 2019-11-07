//
//  WxpayModule.h
//  TaichiApp
//
//  Created by 蓝粑粑 on 2019/5/18.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import "WXApiObject.h"
#import "WXApi.h"

@interface WxpayModule : NSObject <RCTBridgeModule, WXApiDelegate>
@end
