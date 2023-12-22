import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";



//Create User

export const createUser = createAsyncThunk('createUser', async (data , {rejectWithValue}) => {
    console.log("data",data)
    const response = await fetch('https://65716393d61ba6fcc0125fdb.mockapi.io/crud', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data),
    });

    try{
        const result = await response.json();
        return result;
    }
    catch (error){
        return rejectWithValue(error)
    }
})

//Read Action 

export const showUser = createAsyncThunk('showUser', async(data,{rejectWithValue})=> {

    const response = await fetch('https://65716393d61ba6fcc0125fdb.mockapi.io/cr')


    try{
        const result = await response.json();
        return result
    }
    catch(error){
        return rejectWithValue(error);
    }
})

// Delete action

export const deleteUser = createAsyncThunk('deleteUser', async (id, {rejectWithValue})=> {

    const response = await fetch(`https://65716393d61ba6fcc0125fdb.mockapi.io/crud/${id}`,
    {method : 'DELETE'})

    try{
        const result = await response.json();

        return result
    }
    catch(error){
        return rejectWithValue(error)
    }
})

//Update Action

export const updateUser = createAsyncThunk('updateUser', async (data, {rejectWithValue})=> {

    const response = await fetch(`https://65716393d61ba6fcc0125fdb.mockapi.io/crud/${data.id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data),
    });

    try{
        const result = await response.json();

        return result
    }
    catch(error){
        return rejectWithValue(error);
    }
})


export const userDetailsSlice = createSlice({

    name: 'userDetail',

    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: []
    },

    reducers:  {
        searchUser : (state, action) => {
            console.log(action.payload);
            state.searchData = action.payload;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(createUser.pending, (state, action)=> {
            state.loading = true;
        })
        builder.addCase(createUser.fulfilled, (state, action)=> {
            state.loading = false;
            state.users.push(action.payload);
        })
        builder.addCase(createUser.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload.message;
        })

        builder.addCase(showUser.pending, (state, action)=> {
            state.loading = true;
        })
        builder.addCase(showUser.fulfilled, (state, action)=> {
            state.loading = false;
            state.users = action.payload;
        })
        builder.addCase(showUser.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(deleteUser.pending, (state, action)=> {
            state.loading = true;
        })
        builder.addCase(deleteUser.fulfilled, (state, action)=> {
            state.loading = false;
            console.log('delete action',action.payload);

            const {id} = action.payload;

            if(id){
                state.users = state.users.filter((ele) => ele.id !== id)
            }
        })
        builder.addCase(deleteUser.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(updateUser.pending, (state, action)=> {
            state.loading = true;
        })
        builder.addCase(updateUser.fulfilled, (state, action)=> {
            state.loading = false;
            state.users.push(action.payload);
        })
        builder.addCase(updateUser.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
});

//thunk



export default userDetailsSlice.reducer;

export const {searchUser} = userDetailsSlice.actions;