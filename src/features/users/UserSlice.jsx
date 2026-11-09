import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

// create action Asynchrone
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers", async()=>{
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        if(!res.ok){
            throw new Error("Erreur lors du chargement des users")
        }

        const data = await res.json()
        return data
    }
)

// create initialState
const initialState = {
    users : [], loading: false, error: null,
}

// create Slice
const UserSlice = createSlice({
    name:"users", initialState, reducers: {},

    // actions Asynchrones
    extraReducers: (build) => {
        build
        //pending
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true; state.error = null;
        })

        //fulfilled
        .addCase(fetchUsers.fulfilled, (state, action)=>{
            state.loading = false; state.users = action.payload;
        })

        //rejected
        .addCase(fetchUsers.rejected, (state, action)=>{
            state.loading = false; state.users = action.error.message;
        });
    },
})

export default UserSlice.reducer;