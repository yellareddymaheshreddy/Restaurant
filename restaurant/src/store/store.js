import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fooditemsSlice from './foodItemsSlice';
import cartSlice from './cartSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        fooditems: fooditemsSlice,
        cartitems:cartSlice,
        //TODO: add more slices here for rides
    }
});


export default store;