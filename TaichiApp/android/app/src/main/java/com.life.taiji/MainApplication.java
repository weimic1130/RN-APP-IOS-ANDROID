package com.life.taiji;

import android.app.Application;
import com.life.taiji.alipay.AlipayPackage;
import com.theweflex.react.WeChatPackage;
import com.life.taiji.opensettings.*;
import com.facebook.react.ReactApplication;
import org.reactnative.camera.RNCameraPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.syanpicker.RNSyanImagePickerPackage;
import com.reactlibrary.RNAliyunOssPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.imagepicker.ImagePickerPackage;
import com.beefe.picker.PickerViewPackage;
import com.rnfs.RNFSPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import it.innove.BleManagerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
   public boolean getUseDeveloperSupport() {
     return BuildConfig.DEBUG;
   }
//     public boolean getUseDeveloperSupport() {
//       return false;
//     }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new RNCameraPackage(),
              new ReactVideoPackage(),
              new RNSoundPackage(),
              new RNSyanImagePickerPackage(),
              new RNAliyunOssPackage(),
              new AsyncStoragePackage(),
              new ImagePickerPackage(),
              new PickerViewPackage(),
              new VectorIconsPackage(),
              new AlipayPackage(),
              new OrientationPackage(),
              new OpenSettingsPackage(),
              new SplashScreenReactPackage(),
              new RNGestureHandlerPackage(),
              new RNFSPackage(),
              new WeChatPackage(),
              new BleManagerPackage()
       );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
