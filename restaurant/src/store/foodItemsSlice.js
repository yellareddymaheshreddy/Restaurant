import { createSlice } from "@reduxjs/toolkit";

const initialState = {fooditems:[]}

const FoodSlice = createSlice({
    name: "fooditems",
    initialState,
    reducers: {
        setfood: (state, action) => {
            state.fooditems=action.payload
        },

        updatefood: (state,action) => {
            const data=action.payload.data;
            state.fooditems=state.fooditems.map((item)=>{
                if(item.$id!==action.payload.id){
                return item
            }
        return data})
        },
       
        deletefood:(state,action)=>{            
            state.fooditems=state.fooditems.filter((item)=>item.$id != action.payload
        )
        },
        addfood:(state,action)=>{
            state=state.fooditems.push(action.payload)
        }
     }
})




export const {setfood,updatefood,deletefood,addfood} = FoodSlice.actions;

export default FoodSlice.reducer;