import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/public/Login"));
const ErrorPage = lazy(() => import("./pages/public/ErrorPage"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));
// const AdminProtected = lazy(() => import("./components/AdminProtected"));

const Unauthorized = lazy(() => import("./pages/public/Unauthorized"));
const NotFound = lazy(() => import("./pages/public/NotFound"));
const Dashboard = lazy(() =>
  import("./pages/private/admin/dashboard/Dashboard")
);

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
