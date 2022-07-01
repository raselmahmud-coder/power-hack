import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LogIn = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios({
      method: "get",
      url: `https://power-rm.herokuapp.com/login`,
      headers: {
        email,
        password,
      },
    }).then((res) => {
      if (res.data.status === 200) {
        const accessToken = res.data.token;
          localStorage.setItem("accessToken", accessToken);
          navigate('/')
          e.target.reset()
      }
    });
  };
  return (
    <>
      <div className="p-6 lg:w-1/3 mx-auto bg-base-100 drop-shadow rounded mt-12">
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleForm}>
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
          <Link to={"/"} className="block mb-4">
            Forget Password?
          </Link>
          <input
            type="submit"
            value="Login"
            className="block btn-accent mx-auto w-full py-2 rounded-lg cursor-pointer uppercase"
          />
          <div className="text-center my-2">
            <Link to={"/registration"} className="text-primary">
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
