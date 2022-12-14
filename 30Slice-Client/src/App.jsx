import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearMessage } from "./app/redux/slices/auth/message";

// import component
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/theme_assets/js/main.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="main-content">
        <Sidebar />

        <div className="contents">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
