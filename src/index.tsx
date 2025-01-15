import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import { store } from "@/redux/store.ts";
import { Provider } from "react-redux";
import AuthProvider from "./contexts/AuthProvider.tsx";
import ModelProvider from "./contexts/ModelProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
<<<<<<< HEAD
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ModelProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModelProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode >
=======
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <ModelProvider>
          <App />
        </ModelProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
>>>>>>> main
);
