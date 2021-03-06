//#import <React/RCTBridgeDelegate.h>
//#import <UIKit/UIKit.h>
//#import <UMCore/UMAppDelegateWrapper.h>
//
//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
//
//@property (nonatomic, strong) UIWindow *window;
//
//@end
#import <UIKit/UIKit.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>
#import <React/RCTBridgeDelegate.h>
#import <UMCore/UMAppDelegateWrapper.h>

@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate>

@property (nonatomic, strong) UMModuleRegistryAdapter *moduleRegistryAdapter;
@property (nonatomic, strong) UIWindow *window;

@end
