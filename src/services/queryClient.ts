import { QueryClient } from "react-query";
import { logout } from "../slices/userSlice";
import store from "../store";

export default new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: any) => {
        if (error.response.status === 401) {
          store.dispatch(logout());
        }
      },
    },
  },
});
