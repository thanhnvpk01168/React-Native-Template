package com.projectname.AppModule;
import android.app.NotificationChannel;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Build;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;

import androidx.annotation.NonNull;
import android.provider.Settings;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.lang.reflect.Field;
import android.content.res.Resources;
import android.widget.Toast;

public class AppModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
//    private DeviceInfo mDeviceInfo;
//    private FileManager mFileManager;
//    private ImageResizer mImageResizer;
//    private NotificationHelper mNotificationHelper;
//    private MMKVStorage mmkvStorage;

    public AppModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "AppModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getVersion() {
        return "sdfasef";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getSystemVersionAndroid() {
        return Build.VERSION.SDK_INT+"";
    }

    private float getRealHeight(DisplayMetrics metrics) {
        return metrics.heightPixels / metrics.density;
    }
    private float getStatusBarHeight(DisplayMetrics metrics) {
        final Context ctx = getReactApplicationContext();
        final int heightResId = ctx.getResources().getIdentifier("status_bar_height", "dimen", "android");
        return
                heightResId > 0
                        ? ctx.getResources().getDimensionPixelSize(heightResId) / metrics.density
                        : 0;
    }
    private boolean hasPermanentMenuKey() {
        final Context ctx = getReactApplicationContext();
        int id = ctx.getResources().getIdentifier("config_showNavigationBar", "bool", "android");
        return !(id > 0 && ctx.getResources().getBoolean(id));
    }
    private float getSoftMenuBarHeight(DisplayMetrics metrics) {
        if(hasPermanentMenuKey()) {
            return 0;
        }
        final Context ctx = getReactApplicationContext();
        final int heightResId = ctx.getResources().getIdentifier("navigation_bar_height", "dimen", "android");
        return
                heightResId > 0
                        ? ctx.getResources().getDimensionPixelSize(heightResId) / metrics.density
                        : 0;
    }

    protected static float getNormalNavigationBarHeight(final Context ctx) {
        try {
            final Resources res = ctx.getResources();
            int rid = res.getIdentifier("config_showNavigationBar", "bool", "android");
            if (rid > 0) {
                boolean flag = res.getBoolean(rid);
                if (flag) {
                    int resourceId = res.getIdentifier("navigation_bar_height", "dimen", "android");
                    if (resourceId > 0) {
                        return res.getDimensionPixelSize(resourceId);
                    }
                }
            }
        } catch (Throwable e) {
            return 0;
        }
        return 0;
    }

    // 获取魅族SmartBar高度
    private float getSmartBarHeight(DisplayMetrics metrics) {
        final Context context = getReactApplicationContext();
        final boolean isMeiZu = Build.MANUFACTURER.equals("Meizu");

        final boolean autoHideSmartBar = Settings.System.getInt(context.getContentResolver(),
                "mz_smartbar_auto_hide", 0) == 1;

        if (!isMeiZu || autoHideSmartBar) {
            return 0;
        }
        try {
            Class c = Class.forName("com.android.internal.R$dimen");
            Object obj = c.newInstance();
            Field field = c.getField("mz_action_button_min_height");
            int height = Integer.parseInt(field.get(obj).toString());
            return context.getResources().getDimensionPixelSize(height) / metrics.density;
        } catch (Throwable e) { // 不自动隐藏smartbar同时又没有smartbar高度字段供访问，取系统navigationbar的高度
            return getNormalNavigationBarHeight(context) / metrics.density;
        }
        //return getNormalNavigationBarHeight(context) / metrics.density;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public Float getWindowHeightAndroid() {
//        final Map<String, Object> constants =  new HashMap<>();
        final Context ctx = getReactApplicationContext();
        final DisplayMetrics metrics = ctx.getResources().getDisplayMetrics();
        // Get the real display metrics if we are using API level 17 or higher.
        // The real metrics include system decor elements (e.g. soft menu bar).
        //
        // See: http://developer.android.com/reference/android/view/Display.html#getRealMetrics(android.util.DisplayMetrics)
        if (Build.VERSION.SDK_INT >= 17) {
            Display display = ((WindowManager) reactContext.getSystemService(Context.WINDOW_SERVICE))
                    .getDefaultDisplay();
            try {
                Display.class.getMethod("getRealMetrics", DisplayMetrics.class).invoke(display, metrics);
            } catch (InvocationTargetException e) {
            } catch (IllegalAccessException e) {
            } catch (NoSuchMethodException e) {
            }
        }
//        constants.put("REAL_WINDOW_HEIGHT", getRealHeight(metrics));
//        constants.put("STATUS_BAR_HEIGHT", getStatusBarHeight(metrics));
//        constants.put("SOFT_MENU_BAR_HEIGHT", getSoftMenuBarHeight(metrics));
//        constants.put("SMART_BAR_HEIGHT", getSmartBarHeight(metrics));
//        constants.put("SOFT_MENU_BAR_ENABLED", hasPermanentMenuKey());
//        Log.d("logtest",constants+"");
        return (getRealHeight(metrics)-getSoftMenuBarHeight(metrics));
    }

}
