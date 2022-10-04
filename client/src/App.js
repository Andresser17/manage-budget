import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Styles
import "./App.css";
// Sections
import Topbar from "sections/Topbar";
// Routes
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";
import Home from "routes/Home";
import Operations from "routes/Operations";
// Actions
import { signIn as signInAction } from "store/authSlice";

function App() {
  const dispatch = useDispatch();
  const contextClass = {
    success: "secondary",
    error: "secondary",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  useEffect(() => {
    // Fetch the token from storage
    const bootstrapAsync = async () => {
      try {
        const accessToken = await localStorage.getItem("accessToken");

        if (accessToken) {
          dispatch(signInAction());
          return;
        }
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }
    };
    bootstrapAsync();
  }, [dispatch]);

  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/operations" element={<Operations />} />
      </Routes>
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || "default"] + " toast-container"
        }
        bodyClassName={() => "toast-body"}
      />
    </div>
  );
}

export default App;
