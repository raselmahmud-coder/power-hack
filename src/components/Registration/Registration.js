import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Registration = () => {
  const navigate = useNavigate();
  const handleRegistration = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(regexEmail) || name.length <= 4 || password.length <= 5) {
      toast.error(`Plz put valid info`, {
        toastId: "regis",
      });
    } else {
      axios({
        method: "post",
        url: `https://power-rm.herokuapp.com/registration`,
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        data: {
          name,
          email,
          password,
        },
      }).then((res) => {
        if (res.data.status === 200) {
          e.target.reset();
          navigate("/");
          toast.success(`user has created`, {
            toastId: "user-add",
          });
        }
      });
    }
    // console.log(name, email, password);
  };
  return (
    <>
      <div className="p-6 lg:w-1/3 mx-auto bg-base-100 drop-shadow rounded mt-12">
        <h2 className="text-3xl text-center">Registration</h2>
        <form onSubmit={handleRegistration}>
          <label htmlFor="email">Name</label>
          <input
            name="name"
            type="name"
            className="input w-full border-gray-300 border-2"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            className="input w-full border-gray-300 border-2"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="input w-full border-gray-300 border-2"
            required
          />

          <input
            type="submit"
            value="Registration"
            className="block btn-accent mx-auto w-full my-2 py-2 rounded-lg cursor-pointer uppercase"
          />
          <div className="text-center my-2">
            already have an account?{" "}
            <Link to={"/log-in"} className="text-primary">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
