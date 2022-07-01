import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import PowerModal from "../powerModal/PowerModal";
import BillInfo from "./BillInfo";

const Home = () => {
  const [apiError, setApiError] = useState(false);
  const [bills, setBills] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [powerModal, setPowerModal] = useState(true);
  const [forPost, setForPost] = useState("");
  const [search, setSearch] = useState("");

  //   console.log("api error", apiError);
  const handleModal = () => {
    setForPost("post");
    setPowerModal(true);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.value;
    setSearch(text);
  };
  return (
    <>
      {/* htmlFor modal start here */}
      {powerModal && (
        <PowerModal
          setPowerModal={setPowerModal}
          forPost={forPost}
          billsInfo={bills}
          spinner={spinner}
          setSpinner={setSpinner}
          apiError={apiError}
          setApiError={setApiError}
        />
      )}
      {/* modal end here */}
      <div className="grid grid-cols-3 gap-4 mt-20 mb-5">
        <div className="">
          <h1 className="text-1xl font-bold">Billings</h1>
        </div>
        <div className="">
          <input
            className="py-1 px-2 rounded"
            type="text"
            id="search"
            onBlur={handleSearch}
            placeholder="Please Search"
          />
        </div>
        <div className="text-end">
          <label
            onClick={handleModal}
            htmlFor="add-bill"
            className="py-1 px-2 rounded cursor-pointer btn-primary"
          >
            Add new bill
          </label>
        </div>
      </div>
      <BillInfo
        billsInfo={bills}
        spinner={spinner}
        setSpinner={setSpinner}
        apiError={apiError}
        setApiError={setApiError}
        search={search}
      />
    </>
  );
};

export default Home;
