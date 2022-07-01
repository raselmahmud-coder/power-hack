import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateModal from "../powerModal/UpdateModal";

const BillInfo = ({
  billsInfo,
  spinner,
  setSpinner,
  apiError,
  setApiError,
  search,
}) => {
  const [bills, setBills] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [pagination, setPagination] = useState([]);
  const [ForEdit, setForEdit] = useState("");
  const exists = bills.filter(
    (text) =>
      text.name.toLowerCase() == search.toLowerCase() ||
      text.phone == search ||
      text.email.toLowerCase() == search
  );
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
      url: `https://power-rm.herokuapp.com/billing-list`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((resp) => {
        if (resp.data) {
          setSpinner(false);
          setBills(resp.data.response);
          let createArry = [];
          for (let index = 10; index < resp.data.totalPages; index++) {
            const element = resp.data.totalPages[index];
            createArry.push(element);
          }
          setPagination(createArry);
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
    setForEdit(id);
    setUpdateModal(true);
    /*    */

    console.log("edit it", id);
  };
  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: `https://power-rm.herokuapp.com/delete-billing/${id}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      console.log("delete", res);
    });
  };
  return (
    <>
      {updateModal && (
        <UpdateModal
          setPowerModal={setUpdateModal}
          ForEdit={ForEdit}
          billsInfo={bills}
          spinner={spinner}
          setSpinner={setSpinner}
          apiError={apiError}
          setApiError={setApiError}
        />
      )}
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
                  <label
                    onClick={() => handleEdit(bill?._id)}
                    className="btn"
                    htmlFor="edit-bill"
                  >
                    Edit
                  </label>
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
        {pagination.map((item, sl) => (
          <button key={sl} className="btn">
            {sl + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default BillInfo;
