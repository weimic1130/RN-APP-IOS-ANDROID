//
//  RCTAlipay.h
//  TaichiApp
//
//  Created by 蓝粑粑 on 2019/5/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
#import <AlipaySDK/AlipaySDK.h>

@interface RCTAlipay : NSObject<RCTBridgeModule>

+(void) handleCallback:(NSURL *)url;

@end
