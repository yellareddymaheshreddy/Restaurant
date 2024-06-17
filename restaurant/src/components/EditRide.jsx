import React,{useState,useEffect} from 'react'
import FoodForm from './FoodForm'
// import PostForm from './PostForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditRide = () => {
    const [ride, setrides] = useState(null)
    const {slug}=useParams();
    const navigate=useNavigate();
    const allrides=useSelector(state => state.fooditems.fooditems);

    useEffect(() => {
        console.log(allrides, "reading rides reastaurant")
        allrides.map((ride)=>{
            if(ride.$id==slug){
                setrides(ride)
            }
        })
    }, [slug,navigate,allrides])
    
    return ride?(
        <div >
            <FoodForm ride={ride}/>
        </div>
    ):(null);
}

export default EditRide
