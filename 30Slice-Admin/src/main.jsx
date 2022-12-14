////////////////////////////////////////////////////////////////////////////
//  Nhân quả không nợ chúng ta thứ gì, cho nên xin đừng oán giận   ////////
//                                   _
//                                _oo0oo_
//                               o8888888o
//                               88” . “88
//                               (| -_- |)
//                               O\  =  /O
//                            ____/'---'\____
//                          .'  \\|     |//  '.
//                         /  \\|||  :  |||//  \
//                        /  _||||| -:- |||||_  \
//                        |   | \\\  -  /'| |   |
//                        | \_|  `\`---'//  |_/ |
//                        \  .-\__ `-. -'__/-.  /
//                      ___`. .'  /--.--\  `. . '___
//                   ."" '<  `.___\_<|>_/___.'  _> \"".
//                  | | :  `- \`. ;`. _/; .'/  /  .' ; |
//                  \  \ `-.   \_\_`. _.' _/_/  -' _.' /
//===================`-.`___`-.__\ \___   /__.-'_.'_.-'===================//
//                                `=--=-'

// Đức Phật nơi đây phù hộ code con chạy không Bugs. Nam Mô A Di Đà Phật.

//
//                      _.-/`)
//                     // / / )
//                  .=// / / / )
//                 //`/ / / / /
//                // /    `  /
//               ||         /
//              ||         /
//               \\       /
//                ))    .'
//               //     /
//                     /

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";

import { store, persistor } from "./app/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import setupInterceptors from "./app/axios/setupInterceptors";

import routes from "./routes/routes";
import app from "./app/firebase/firebaseConfig";
import "./main.css";
import "react-toastify/dist/ReactToastify.css";
// import '/assets/theme_assets/sass/style.scss';
// import '/assets/vendor_assets/css/bootstrap/bootstrap.scss';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);

setupInterceptors(store);
