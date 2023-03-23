import Header from "./components/Header";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { Rings } from "react-loader-spinner";
import "./App.scss";
function App() {
  const { user } = useContext(UserContext);
  console.log("apppppppppppp", user.isLoading);
  return (
    <div className="App">
      <>
        {user && user.isLoading ? (
          <div className="loadingdata">
            <Rings
              height="100px"
              width="100px"
              color="grey"
              ariaLabel="loading"
            />
            <div>loading data .....</div>
          </div>
        ) : (
          <>
            <div className="app-header">
              <Header />
            </div>
            <div className="app-content">
              <Outlet />
            </div>
          </>
        )}
      </>

      <ToastContainer />
    </div>
  );
}

export default App;
