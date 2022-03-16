export { };
// import { Platform } from 'react-native';
// import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';

// export async function requestCameraPermission() {
//     const status = await request(
//         Platform.select({
//             android: PERMISSIONS.ANDROID.CAMERA,
//             ios: PERMISSIONS.IOS.CAMERA,
//         }),
//     );
//     return status;
// }
// export async function requestMicrophonePermission() {
//     const status = await request(
//         Platform.select({
//             android: PERMISSIONS.ANDROID.RECORD_AUDIO,
//             ios: PERMISSIONS.IOS.MICROPHONE,
//         }),
//     );
//     return status;
// }
// export async function requestMediaPermission() {
//     const statusRead = await request(
//         Platform.select({
//             android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
//             ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
//         }),
//     );
//     const statusWrite = await request(
//         Platform.select({
//             android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
//             ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
//         }),
//     );
//     return { statusRead, statusWrite };
// }
// export async function requestLocationPermission() {
//     const status = await request(
//         Platform.select({
//             android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//             ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//         }),
//     );
//     return status;
// }

// export function checkPermission(
//     permission,
//     onUnAvailable,
//     onDenied,
//     onLimited,
//     onGranted,
//     onBlocked,
//     onCatch
// ) {
//     check(permission).then((result) => {
//         switch (result) {
//             case RESULTS.UNAVAILABLE:
//                 //    This feature is not available (on this device / in this context)
//                 onUnAvailable && onUnAvailable();
//                 break;
//             case RESULTS.DENIED:
//                 //    The permission has not been requested / is denied but requestable
//                 onDenied && onDenied();
//                 break;
//             case RESULTS.LIMITED:
//                 // The permission is limited: some actions are possible
//                 onLimited && onLimited();
//                 break;
//             case RESULTS.GRANTED:
//                 //   The permission is granted
//                 onGranted && onGranted();
//                 break;
//             case RESULTS.BLOCKED:
//                 //   The permission is denied and not requestable anymore
//                 onBlocked && onBlocked();
//                 break;
//         }
//     })
//         .catch((error) => {
//             onCatch && onCatch(error);
//         });
// };
