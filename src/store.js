import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Configures the central Redux store for the entire application
const store = configureStore({
    // Combines individual slice reducers into the root reducer object
    reducer: {
        // Assigns the cartReducer to handle state changes under the 'cart' namespace
        cart: cartReducer,
    },
});

// Exports the configured store instance to be used by the React <Provider> component
export default store;
