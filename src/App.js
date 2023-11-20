import "./App.css";
import { login, logout } from "./store/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./AppWrite/auth_service";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoader(false));
  }, []);

  return !loader ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default App;
