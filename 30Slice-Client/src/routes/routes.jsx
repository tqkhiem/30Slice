import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// import ProtectedRoute from "./protectedRoute";
// import PrivateRoute from "./privateRoute";
// import ProtectedCheckoutRoute from "./protectedCheckoutRoute";
const PrivateRoute = lazy(() => import("./privateRoute"));
const ProtectedRoute = lazy(() => import("./protectedRoute"));
const ProtectedCheckoutRoute = lazy(() => import("./protectedCheckoutRoute"));

// import App from "../App";
import App from "../App";
const Booking = lazy(() => import("../pages/booking"));
const Products = lazy(() => import("../pages/products"));
const Detail = lazy(() => import("../pages/detail"));
const Home = lazy(() => import("../pages/home"));
const Error = lazy(() => import("../pages/Error"));
const Cart = lazy(() => import("../pages/cart"));
const Category = lazy(() => import("../pages/Category"));
const Checkout = lazy(() => import("../pages/checkout"));
const Checkout2 = lazy(() => import("../pages/checkout/checkout2"));
const Checkout3 = lazy(() => import("../pages/checkout/checkout3"));
const Checkout4 = lazy(() => import("../pages/checkout/checkout4"));
const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../pages/signup"));
const Profile = lazy(() => import("../pages/profile"));
const Order = lazy(() => import("../pages/order"));
const OrderInfo = lazy(() => import("../pages/order/Info"));
const BookedHistory = lazy(() => import("../pages/booked-history"));
const ForgetPassword = lazy(() => import("../pages/forget-password"));
const ResetPassword = lazy(() => import("../pages/reset-password"));
const BookingSuccess = lazy(() => import("../pages/booking-success"));
const About = lazy(() => import("../pages/about/About"));
const Contact = lazy(() => import("../pages/contact"));
const Combo = lazy(() => import("../pages/combo"));
const ComboDetail = lazy(() => import("../pages/combo/DetailsCombo"));
const News = lazy(() => import("../pages/news"));
const NewsDetail = lazy(() => import("../pages/news/Details"));
const Crew = lazy(() => import("../pages/crew"));

const routes = createBrowserRouter([
  {
    path: "/",
    exact: true,
    children: [
      {
        path: "",
        exact: true,
        element: <App />,
        children: [
          {
            path: "",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "booking",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Booking />
              </Suspense>
            ),
          },
          {
            path: "products",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Products />
              </Suspense>
            ),
          },
          {
            path: "products/:id",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Detail />
              </Suspense>
            ),
          },
          {
            path: "category",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Category />
              </Suspense>
            ),
          },
          {
            path: "category/:id",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Category />
              </Suspense>
            ),
          },
          {
            path: "cart",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Cart />
              </Suspense>
            ),
          },
          {
            path: "checkout",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedCheckoutRoute>
                  <Checkout />
                </ProtectedCheckoutRoute>
              </Suspense>
            ),
          },
          {
            path: "checkout2",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute>
                  <Checkout2 />
                </PrivateRoute>
              </Suspense>
            ),
          },
          {
            path: "checkout3",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute>
                  <Checkout3 />
                </PrivateRoute>
              </Suspense>
            ),
          },
          {
            path: "order-success",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute>
                  <Checkout4 />
                </PrivateRoute>
              </Suspense>
            ),
          },
          {
            path: "register",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: "login",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: "forget-password",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedRoute>
                  <ForgetPassword />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: "reset-password",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: "profile",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              </Suspense>
            ),
          },
          {
            path: "order",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute>
                  <Order />
                </PrivateRoute>
              </Suspense>
            ),
          },
          {
            path: "order/:id",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute>
                  <OrderInfo />
                </PrivateRoute>
              </Suspense>
            ),
          },
          {
            path: "booked-history",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PrivateRoute>
                  <BookedHistory />
                </PrivateRoute>
              </Suspense>
            ),
          },
          {
            path: "booking-success/:id",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BookingSuccess />
              </Suspense>
            ),
          },
          {
            path: "news",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <News />
              </Suspense>
            ),
          },
          {
            path: "news/:id",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <NewsDetail />
              </Suspense>
            ),
          },
          {
            path: "about",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <About />
              </Suspense>
            ),
          },
          {
            path: "contact",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Contact />
              </Suspense>
            ),
          },
          {
            path: "combo",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Combo />
              </Suspense>
            ),
          },
          {
            path: "combo/:id",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ComboDetail />
              </Suspense>
            ),
          },
          {
            path: "crew",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Crew />
              </Suspense>
            ),
          },
        ],
      },
    ],
    errorElement: (
      <Suspense fallback={<p>Loading...</p>}>
        <Error />
      </Suspense>
    ),
  },
]);

export default routes;
