import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUser, deleteUser } from '../features/userDetailsSlice';
import CustomModel from './customModel';
import { Link } from 'react-router-dom';



function Read() {

    const dispatch = useDispatch();

    const { users, loading, searchData } = useSelector((state) => state.app)

    const [id, setId] = useState();

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {

        dispatch(showUser());

    }, [])

    if (loading) {
        return <h2>Loading</h2>
    }

    return (

        <div>
            {showPopup && <CustomModel id={id} showPopup={showPopup} setShowPopup={setShowPopup}></CustomModel>}
            <h2 className='text-center'>All Data</h2>

            {
                users && users
                    .filter((ele) => {
                        if (searchData.length === 0) {
                            return ele
                        }
                        else {
                            return ele.name.toLowerCase().includes(searchData.toLowerCase());
                        }
                    }).map((data) => (

                        <div key={data.id} className='d-flex justify-content-center my-2'>


                            <div className="card w-50">
                                <div className="card-body">
                                    <h5 className="card-title">{data.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{data.filename}</h6>
                                    <p className="card-text">{data.age}</p>
                                    <p className="card-text">{data.gender}</p>
                                    <button href="#" className="card-link" onClick={() => (setId(data.id), setShowPopup(true))}>View</button>
                                    <Link to={`/edit/${data.id}`} className='card-link'>
                                        Edit
                                    </Link>

                                    <Link onClick={() => dispatch(deleteUser(data.id))} className='card-link'>
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </div>

                    ))
            }
        </div>
    )
}

export default Read