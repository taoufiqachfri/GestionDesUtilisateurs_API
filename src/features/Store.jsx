import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./users/UserSlice"

const Store = configureStore({ reducer : {users : UserSlice},})
export default Store;