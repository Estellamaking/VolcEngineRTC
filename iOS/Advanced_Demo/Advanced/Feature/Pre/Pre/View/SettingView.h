//
//  SettingView.h
//  Advanced
//
//

#import <UIKit/UIKit.h>
#import "Masonry.h"
#import "DeviceInforTool.h"
#import "ToastComponents.h"
#import "SettingBaseModel.h"
#import "SettingTableViewCell.h"

NS_ASSUME_NONNULL_BEGIN

@interface SettingView : UIView

@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSArray *dataArray;

- (void)reloadData;

@end

NS_ASSUME_NONNULL_END
