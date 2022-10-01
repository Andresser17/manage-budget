import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Styles
import "./App.css";
// Sections
import Topbar from "sections/Topbar";
// Routes
import SignIn from "./routes/SignIn";
import Home from "./routes/Home";

function App() {
  const contextClass = {
    success: "secondary",
    error: "secondary",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
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
