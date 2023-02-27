import Header from "./components/Header";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-content">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
