import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import { Provider as AuthProvider } from "next-auth/client";
import StorageService from "../services/StorageService";
import { hydrate } from "../slices/basketSlice";

store.subscribe(() => {
  StorageService.set("basket", JSON.stringify(store.getState().basket));
});

let basket = StorageService.get("basket");
basket = basket ? JSON.parse(basket) : { items: [] };
store.dispatch(hydrate(basket));

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer transition={Zoom} />
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
