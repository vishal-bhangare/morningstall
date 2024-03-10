import { createBrowserRouter } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./components/Home/Home";
import RootLayout from "./components/RootLayout";
import SuperuserDashboard from "./components/SuperUser/Dashboard/SuperuserDashboard";
import SuperuserLogin from "./components/SuperUser/Login/SuperuserLogin";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import BookDetail from "./components/BookDetail/BookDetail";
import BooksListing from "./components/BooksListing/BooksListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/books/:tag", element: <BooksListing /> },
      { path: "/book/:id", element: <BookDetail /> },

      { path: "/admin", element: <Admin /> },
      { path: "/superuser/login", element: <SuperuserLogin /> },
      { path: "/superuser/dashboard", element: <SuperuserDashboard /> },
    ],
  },
]);

export default router;
