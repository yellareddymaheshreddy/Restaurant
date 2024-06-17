import React,{useState,useEffect} from 'react'
import FoodForm from './FoodForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditRide = () => {
    const [item, setitems] = useState(null)
    const {slug}=useParams();
    const navigate=useNavigate();
    const allrides=useSelector(state => state.fooditems.fooditems);

    useEffect(() => {
        allrides.map((item)=>{
            if(item.$id==slug){
                setitems(item)
            }
        })
    }, [slug,navigate,allrides])
    
    return item?(
        <div >
            <FoodForm item={item}/>
        </div>
    ):(null);
}

export default EditRide
