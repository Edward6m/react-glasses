// import { createRoot } from "react-dom/client";
// // import './index.css'
// import { store } from "./store";
// import { Provider } from "react-redux";
// import App from "./App.jsx";
// import { HashRouter } from "react-router-dom";

// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );


import { createRoot } from "react-dom/client";
import { store } from "./store.js";
import { Provider } from "react-redux";
import App from "./App.js";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Provider store={store}>  
        <App />    
    </Provider>
  </HelmetProvider>
);