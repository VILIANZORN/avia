    import { configureStore } from "@reduxjs/toolkit";

    import filterReducer from "./filterSlice";
    import cardReducer from "./cardSlice"
    import tabsSlice from "./tabsSlice";

    export default configureStore({
        reducer:{
            filter: filterReducer,
            card: cardReducer,
            tabs: tabsSlice,
        }
    })