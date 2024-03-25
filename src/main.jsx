import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./statemanager/store.jsx";
import BackEndDataCatalog from "./statemanager/BackEndDataCatalog.jsx";
import MobileVideoDisplayCarousel from "./components/Carousel/MobileVideoDisplayCarousel.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let persistor = persistStore(store);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BackEndDataCatalog>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <App /> {/* <MobileVideoDisplayCarousel /> */}
          </QueryClientProvider>
        </BackEndDataCatalog>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
