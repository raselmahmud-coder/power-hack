import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Home from "./components/HomePage/Home";
import LogIn from "./components/LogIn/LogIn";
import Registration from "./components/Registration/Registration";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
