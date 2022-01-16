# React-Native-Template
React-Native-Template

I. If you use Proguard you will need to add these lines to android/app/proguard-rules.pro:
1. FastImage
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

2. Reanimated 2 
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

3. React Native SVG
-keep public class com.horcrux.svg.** {*;}

II. 
