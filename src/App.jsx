import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
import { useApp } from "./lib/AppStore";
import Alert from "./components/Alert";
import LoadingPage from "./components/LoadingPage";

const Login = lazy(() => import("./pages/public/Login"));
const ErrorPage = lazy(() => import("./pages/public/ErrorPage"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));
const RoleProtected = lazy(() => import("./components/RoleProtected"));

// public pages
const Unauthorized = lazy(() => import("./pages/public/Unauthorized"));
const NotFound = lazy(() => import("./pages/public/NotFound"));

// admin pages
const Dashboard = lazy(() =>
  import("./pages/private/admin/dashboard/Dashboard")
);
const Branches = lazy(() => import("./pages/private/admin/branches/Branches"));
const CreateBranch = lazy(() =>
  import("./pages/private/admin/branches/CreateBranch")
);
const Users = lazy(() => import("./pages/private/admin/users/Users"));
const CreateUser = lazy(() => import("./pages/private/admin/users/CreateUser"));
const Stock = lazy(() => import("./pages/private/admin/stock/Stock"));
const CreateStock = lazy(() =>
  import("./pages/private/admin/stock/CreateStock")
);

// shared pages
const Orders = lazy(() => import("./pages/private/shared/orders/Orders"));
const CreateOrder = lazy(() =>
  import("./pages/private/shared/orders/CreateOrder")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPage />}>
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
      <Suspense fallback={<LoadingPage />}>
        <RequireAuth />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin"]}>
              <Dashboard />
            </RoleProtected>
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin", "sales", "kitchen"]}>
              <Orders />
            </RoleProtected>
          </Suspense>
        ),
      },
      {
        path: "manage/orders/create",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin", "sales", "kitchen"]}>
              <CreateOrder />
            </RoleProtected>
          </Suspense>
        ),
      },
      {
        path: "manage/branches",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin"]}>
              <Branches />
            </RoleProtected>
          </Suspense>
        ),
      },
      {
        path: "manage/branches/create",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin"]}>
              <CreateBranch />
            </RoleProtected>
          </Suspense>
        ),
      },
      {
        path: "manage/users",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin"]}>
              <Users />
            </RoleProtected>
          </Suspense>
        ),
      },
      {
        path: "manage/users/create",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin"]}>
              <CreateUser />
            </RoleProtected>
          </Suspense>
        ),
      },
      {
        path: "manage/stock",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin", "sales"]}>
              <Stock />
            </RoleProtected>
          </Suspense>
        ),
      },
      {
        path: "manage/stock/create",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <RoleProtected allowedRoles={["admin", "sales"]}>
              <CreateStock />
            </RoleProtected>
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  const { alert, setAlert } = useApp((state) => state);

  useEffect(() => {
    if (!alert.message) return;

    const timeoutId = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [alert.message, setAlert]);

  return (
    <>
      {alert?.message && <Alert message={alert.message} type={alert.type} />}
      <RouterProvider router={router} />
    </>
  );
};
export default App;
