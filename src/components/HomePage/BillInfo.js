import React, { useEffect, useState } from "react";
import axios from "axios";

const BillInfo = ({
  billsInfo,
  spinner,
  setSpinner,
  apiError,
  setApiError,
}) => {
  const [bills, setBills] = useState([]);
  // console.log("api error", apiError);
  useEffect(() => {
    if (!(Object.keys(billsInfo).length === 0)) {
      console.log("object not empty");
      setApiError(false);
      bills.push(billsInfo);
    }
    if (apiError) {
      console.log("api error true");
      bills.pop(billsInfo);
    }
    axios({
      method: "get",
      url: `http://localhost:5000/billing-list`,
      headers: {},
    })
      .then((resp) => {
        if (resp.data) {
          setSpinner(false);
          setBills(resp.data);
        }
      })
      .catch((err) => console.log("error", err));
    // console.log("resp",billsInfo);
  }, [billsInfo, bills, setSpinner, apiError, setApiError]);

  const unique = Object.values(
    bills.reduce(
      (acc, cur) => Object.assign(acc, { [cur._id || cur.id]: cur }),
      {}
    )
  );
  const handleEdit = (id) => {
    console.log("edit it", id);
  };
  const handleDelete = (id) => {
    console.log("delete it", id);
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>
                {spinner ? (
                  <p className="text-xl text-blue-500">Generating Id...</p>
                ) : (
                  "Billing ID"
                )}
              </th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Paid Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unique.map((bill, index) => (
              <tr key={bill?._id || index}>
                <td>{bill?._id}</td>
                <td>{bill?.name}</td>
                <td>{bill?.email}</td>
                <td>{bill?.phone}</td>
                <td>$ {bill?.paidAmount}</td>
                <td>
                  <button onClick={() => handleEdit(bill?._id)} className="btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bill?._id)}
                    className="btn ml-2"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn-group flex justify-center mt-6">
        <button className="btn">1</button>
        <button className="btn btn-active">2</button>
        <button className="btn">3</button>
        <button className="btn">4</button>
      </div>
    </>
  );
};

export default BillInfo;
