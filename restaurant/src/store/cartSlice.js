import { createSlice } from "@reduxjs/toolkit";
import service from "../appwrite/config";

const initialState = {cartitems:[]}

const CartSlice = createSlice({
    name: "cartitems",
    initialState,
    reducers: {
        setcart: (state, action) => {
            state.cartitems=action.payload
        },

        updatecart: (state,action) => {
            const data=action.payload.data;
            state.cartitems=state.cartitems.map((item)=>{if(item.ItemID!==action.payload.id){
                return item
            }
        return data})
        },
       
        deletefromcart:(state,action)=>{            
            state.cartitems=state.cartitems.filter((item)=>item.ItemID!= action.payload
        )
        },
        additemtocart:(state,action)=>{
            state=state.cartitems.push(action.payload)
        }
     }
})




export const {setcart,updatecart,deletefromcart,additemtocart} = CartSlice.actions;

export default CartSlice.reducer;