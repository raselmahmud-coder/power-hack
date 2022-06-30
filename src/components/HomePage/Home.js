import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import BillInfo from "./BillInfo";

const Home = () => {
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [bills, setBills] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [powerModal, setPowerModal] = useState(true);
  const handleForm = (e) => {
    e.preventDefault();
    const name = e.target.fullName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const paidAmount = e.target.amount.value;
    const id = Math.random(Math.round() + 99) * 5;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (
      !email.match(regexEmail) ||
      phone.length <= 10 ||
      phone.length >= 12 ||
      name.length < 3
    ) {
      setError(true);
    } else {
      setError(false);
      setBills({ id, name, email, phone, paidAmount });
      setSpinner(true);
      axios({
        method: "post",
        url: `http://localhost:5000/add-billing`,
        headers: {},
        data: {
          name,
          email,
          phone,
          paidAmount,
        },
      }).then((result) => {
        // console.log("result", result.data.status);
        setPowerModal(false);
        if (result.data.status !== 200) {
          setApiError(true);
          toast.error(`api response error`, {
            toastId: "api-error",
          });
        } else {
          setApiError(false);
        }
      });
    }
    };
    console.log("api error", apiError);
  const handleModal = () => {
    setPowerModal(true);
  };
  return (
    <>
      {/* htmlFor modal start here */}
      {powerModal && (
        <>
          <input type="checkbox" id="add-bill" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
              <label
                htmlFor="add-bill"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form onSubmit={handleForm}>
                <input
                  className="block w-10/12 p-1 rounded my-1"
                  type="text"
                  name="fullName"
                  id=""
                  placeholder="Enter Full Name"
                  required
                />

                <input
                  className="block w-10/12 p-1 rounded my-1"
                  type="email"
                  name="email"
                  id=""
                  placeholder="Enter email"
                  required
                />
                <input
                  className="block w-10/12 p-1 rounded my-1"
                  type="number"
                  name="phone"
                  id=""
                  placeholder="Enter phone"
                  required
                />
                <input
                  className="block w-10/12 p-1 rounded my-1"
                  type="number"
                  name="amount"
                  id=""
                  placeholder="Enter Amount"
                  required
                />
                {error && (
                  <p className="text-red-500 text-xl text-center">
                    Please give valid info
                  </p>
                )}
                <div className="modal-action">
                  <button typeof="submit" className="btn-xl cursor-pointer">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* modal end here */}
      <div className="grid grid-cols-3 gap-4 mt-20 mb-5">
        <div className="">
          <h1 className="text-1xl font-bold">Billings</h1>
        </div>
        <div className="">
          <input
            className="py-1 px-2 rounded"
            type="search"
            name="search"
            id=""
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
      />
    </>
  );
};

export default Home;
