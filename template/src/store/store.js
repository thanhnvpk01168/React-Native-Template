import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const incrementByAmount = createAction('incrementByAmount');

const initialState = {
    value: 0,
    userInfo: {
        id: 1,
        token: null,
    },
};

const rootReducer = createReducer(initialState, builder => {
    builder
        .addCase(increment, (state, action) => {
            state.value++;
        })
        .addCase(decrement, (state, action) => {
            state.value--;
        })
        .addCase(incrementByAmount, (state, action) => {
            state.value = action.payload.value;
        });
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

// -----   Usage   -----
// import { useSelector } from '~/common/hooks';
// import { useDispatch } from 'react-redux';
// const userInfo = useSelector(state => state.userInfo);  // {id:1,token: null}
// const rootState = useSelector(state => state);          // { value: 0, userInfo: {id: 1,token: null} }
// const dispatch = useDispatch();

// import store, { increment, incrementByAmount } from '~/store/store';
// store.getState();                                       // { value: 0, userInfo: {id: 1,token: null} }
// dispatch(increment());
// dispatch(incrementByAmount({ value: 5 }));
