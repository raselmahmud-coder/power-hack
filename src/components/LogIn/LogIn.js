import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = () => {
//   const navigate = useNavigate();
  const location = useLocation();
//   const from = location.state?.from?.pathname || "/";
/*   useEffect(() => {
    if (logInUser) {
       <UseToken user={logInUser}/>;
      navigate(from, { replace: true });
    }
  }, [navigate, from, logInUser]);

  if (loadingUser) {
    return (
      <>
        <SpinnerCircular
          speed={120}
          color={"#0FCFEC"}
          style={{ margin: "0px auto", display: "block" }}
        />
      </>
    );
  }
  if (errorUser) {
    toast.error(`Custom log in ${errorUser}`, {
      toastId: "custom_err",
      theme: "colored",
    });
  } */
  const handleForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // await signInWithEmailAndPassword(email, password);
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