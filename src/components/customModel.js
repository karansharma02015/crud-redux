import React from 'react'
import "./Custom.css";
import { useSelector } from 'react-redux'

function CustomModel({ id, showPopup, setShowPopup }) {

  const user = useSelector((state) => state.app.users)

  const singleUser = user.filter((ele) => ele.id === id);

  console.log('single', singleUser);

  return (
    <div className='modalBackground text-danger'>
      <div className='modalContainer'>
        <button onClick={()=> setShowPopup(false)}>close</button>
        <h2>  {singleUser[0].name}   </h2>
        <h2>  {singleUser[0].email}   </h2>
        <h2>  {singleUser[0].age}   </h2>
        <h2>  {singleUser[0].gender}   </h2>
        


      </div>



    </div>
  )
}

export default CustomModel;


