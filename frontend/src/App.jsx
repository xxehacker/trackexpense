import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import { useSelector } from "react-redux";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import AddTransaction from "./components/Transactions/TransactionForm";
import Deshboard from "./components/Users/Deshboard";
import UserProfile from "./components/Users/UserProfile";
import NotFound from "./components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateTransaction from "./components/Transactions/UpdateTransaction";
import AuthChecker from "./components/Auth/AuthChecker";

function App() {
  const user = useSelector((state) => state?.auth?.user);

  return (
    <BrowserRouter>
      <ToastContainer />
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            user ? (
              <>
                <Navigate to="/" replace />
              </>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <>
                <Navigate to="/" replace />
              </>
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/add-category"
          element={
            <AuthChecker>
              <AddCategory />
            </AuthChecker>
          }
        />
        <Route
          path="/categories"
          element={
            <AuthChecker>
              <CategoriesList />
            </AuthChecker>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <AuthChecker>
              <UpdateCategory />
            </AuthChecker>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <AuthChecker>
              <AddTransaction />
            </AuthChecker>
          }
        />
        <Route
          path="/update-transaction/:id"
          element={
            <AuthChecker>
              <UpdateTransaction />
            </AuthChecker>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthChecker>
              <Deshboard />
            </AuthChecker>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthChecker>
              <UserProfile />
            </AuthChecker>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
