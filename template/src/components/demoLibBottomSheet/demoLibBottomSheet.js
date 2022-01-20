// const BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } = require("@gorhom/bottom-sheet");

// const bottomSheetRef = useRef();

// <BottomSheet
//     ref={bottomSheetRef}
//     index={0}
//     snapPoints={[55 + insets.bottom + 30, deviceH / 2, deviceH - insets.top]}
//     backdropComponent={
//         useCallback(
//             props => (
//                 <BottomSheetBackdrop
//                     {...props}
//                     disappearsOnIndex={0}
//                     appearsOnIndex={2}
//                 >
//                     <View style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>

//                     </View>
//                 </BottomSheetBackdrop>
//             ), [])
//     }
//     handleComponent={
//         useCallback(
//             props => (
//                 <View style={{ width: '100%', height: 50, backgroundColor: 'orange' }} />
//             ), [])
//     }
//     onChange={(index) => {
//         console.log("onChange: ", index);
//     }}>
//     <BottomSheetScrollView>
//         {
//             [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => {
//                 return (
//                     <Text style={{ color: 'green', textAlign: 'center' }} key={`keytest${i}`}>{i}</Text>
//                 )
//             })
//         }
//     </BottomSheetScrollView>
// </BottomSheet>