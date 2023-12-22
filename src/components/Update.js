import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '../features/userDetailsSlice';
import { Navigate, useParams } from 'react-router-dom';

function Update() {

    const dispatch = useDispatch();

    const { id } = useParams();

    const [updateData, setUpdateData] = useState();

    const {user, loading} = useSelector((state) => state.app)

  

    useEffect(()=> {

        if(id){
            const singleUser = user.filter((ele) => ele.id === id);
            setUpdateData(singleUser[0]);
        }
    },[]);

    const newData = (e) => {
        setUpdateData({...updateData, [e.target.name] : e.target.value});
    }

    const handleSubmit = (e) => {
        console.log(updateUser);
        e.preventDefault();
        dispatch(updateUser(updateData));
        Navigate('/read')
    }

    console.log(updateData);

    return (
        <div className='bg-light text-black'>
            <h2 className=" d-flex justify-content-center">Fill the data</h2>
            <form className="w-50 mx-auto my-5"  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        required
                        value={updateData && updateData.name}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        required
                        value={updateData && updateData.email}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        name="age"
                        className="form-control"
                        required
                        value={updateData && updateData.age}
                        onChange={newData}
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        name="gender"
                        value="Male"
                        type="radio"
                        required
                        checked={updateData && updateData.gender === 'Male'}
                        onChange={newData}

                    />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        name="gender"
                        value="Female"
                        type="radio"
                        checked={updateData && updateData.gender === 'Female'}
                        onChange={newData}
                    />
                    <label className="form-check-label">Female</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Update