import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/public/Login"));
const ErrorPage = lazy(() => import("./pages/public/ErrorPage"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));
// const AdminProtected = lazy(() => import("./components/AdminProtected"));

// public pages
const Unauthorized = lazy(() => import("./pages/public/Unauthorized"));
const NotFound = lazy(() => import("./pages/public/NotFound"));

// admin pages
const Dashboard = lazy(() =>
  import("./pages/private/admin/dashboard/Dashboard")
);
const Branches = lazy(() => import("./pages/private/admin/branches/Branches"));
const Staff = lazy(() => import("./pages/private/admin/staff/Staff"));
const Stock = lazy(() => import("./pages/private/admin/stock/Stock"));

// shared pages
const Orders = lazy(() => import("./pages/private/shared/orders/Orders"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Loading Page</p>}>
        <Login />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: (
      <Suspense fallback={<p>Loading Page</p>}>
        <RequireAuth />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading Page</p>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<p>Loading Page</p>}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "manage/branches",
        element: (
          <Suspense fallback={<p>Loading Page</p>}>
            <Branches />
          </Suspense>
        ),
      },
      {
        path: "manage/staff",
        element: (
          <Suspense fallback={<p>Loading Page</p>}>
            <Staff />
          </Suspense>
        ),
      },
      {
        path: "manage/stock",
        element: (
          <Suspense fallback={<p>Loading Page</p>}>
            <Stock />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
