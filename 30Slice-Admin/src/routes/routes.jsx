import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// import ProtectedRoute from './protectedRoute';
const ProtectedRoute = lazy(() => import("./protectedRoute"));
import PrivateRoute from "./privateRoute";

import App from "../App";
import Order from "../pages/order";
const Login = lazy(() => import("../pages/login"));
const Error = lazy(() => import("../pages/error"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Profile = lazy(() => import("../pages/profile"));
const ForgetPassword = lazy(() => import("../pages/forget-password"));
const ResetPassword = lazy(() => import("../pages/reset-password"));
const Category = lazy(() => import("../pages/category"));
const Product = lazy(() => import("../pages/product"));
const News = lazy(() => import("../pages/news"));
const EditCategory = lazy(() => import("../pages/category/edit"));
const Employee = lazy(() => import("../pages/employee"));
const StyleList = lazy(() => import("../pages/stylelist"));
const Combo = lazy(() => import("../pages/combo"));
const TestCk = lazy(() => import("../pages/ckeditortest"));
const AddNews = lazy(() => import("../pages/news/AddNews"));
const EditNews = lazy(() => import("../pages/news/EditNews"));
const Schedule = lazy(() => import("../pages/schedule"));
const Services = lazy(() => import("../pages/services"));
const Customer = lazy(() => import("../pages/customers"));

const routes = createBrowserRouter([
  {
    path: "/",
    exact: true,
    children: [
      {
        path: "",
        exact: true,
        element: (
          <PrivateRoute>
            <App />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "products",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Product />
              </Suspense>
            ),
          },
          {
            path: "customer",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Customer />
              </Suspense>
            ),
          },
          {
            path: "profile",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Profile />
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
            path: "combo",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Combo />
              </Suspense>
            ),
          },
          {
            path: "category/:id",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <EditCategory />
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
            path: "add-news",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <AddNews />
              </Suspense>
            ),
          },
          {
            path: "edit-news/:id",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <EditNews />
              </Suspense>
            ),
          },
          {
            path: "employee",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Employee />
              </Suspense>
            ),
          },
          {
            path: "stylelist",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <StyleList />
              </Suspense>
            ),
          },
          {
            path: "schedule",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Schedule />
              </Suspense>
            ),
          },
          {
            path: "orders",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Order />
              </Suspense>
            ),
          },
          {
            path: "services",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Services />
              </Suspense>
            ),
          },
          {
            path: "test",
            exact: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <TestCk />
              </Suspense>
            ),
          },
        ],
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
    ],
    errorElement: (
      <Suspense fallback={<p>Loading...</p>}>
        <Error />,
      </Suspense>
    ),
  },
]);

export default routes;
