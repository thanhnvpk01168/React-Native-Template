# React-Native-Template
React-Native-Template

#### I. If you use Proguard you will need to add these lines to android/app/proguard-rules.pro:
```shell
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```
###### 1. FastImage
```shell
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}
```
###### 2. Reanimated 2 
```shell
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
```
###### 3. React Native SVG
```shell
-keep public class com.horcrux.svg.** {*;}
```
###### 4. If Enabling Hermes
```shell
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```
#### II. 