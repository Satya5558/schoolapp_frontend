import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { User } from "./types/authTypes";

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state: { userReducer: Partial<User> }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch {
    // Ignore write errors
  }
};

// Create Redux store with persisted state
const persistedState = loadState();

const store = configureStore({
  reducer: { userReducer },
  preloadedState: persistedState as { userReducer: Partial<User> },
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
