"use client";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<h1>loading...</h1>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;