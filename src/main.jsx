import React from "react";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import router from "./routes/routes.jsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
