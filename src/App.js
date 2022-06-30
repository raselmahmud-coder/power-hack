import { Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/HomePage/Home";
import LogIn from "./components/LogIn/LogIn";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <LogIn path="/" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
