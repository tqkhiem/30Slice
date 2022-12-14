import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from './app/redux/slices/auth/message';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Header from './components/layout/header';
import Sidebar from './components/layout/sidebar';
import Footer from './components/layout/footer';
import Spin from './components/layout/spin';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/assets/theme_assets/js/main.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/assets/vendor_assets/js/trumbowyg.min.js';
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
        <Sidebar />
        <div className="contents">
          <Outlet />
        </div>
        <Footer />
      </main>
      <Spin />
    </>
  );
}

export default App;
