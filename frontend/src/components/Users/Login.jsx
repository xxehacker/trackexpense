import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginApi } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import login from "../../assets/login.svg";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginApi,
    mutationKey: ["login"],
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      mutateAsync(values)
        .then((data) => {
          dispatch(loginAction(data));
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div className="flex items-center justify-center p-4 md:w-full min-h-[90vh] bg-gradient-to-r from-blue-500 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl overflow-hidden flex-col-reverse md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 flex justify-center align-center flex-col">
          <h2 className="text-4xl text-center font-bold text-gray-800 mb-6 uppercase underline">
            Login
          </h2>

          {isPending && <AlertMessage message="Logging in..." type="info" />}
          {isError && <AlertMessage message={error?.response?.data?.message} type="error" />}
          {isSuccess && (
            <AlertMessage message="Login Successful!" type="success" />
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="mb-4 ">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-4 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600">
              Register
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-green-400 flex items-center justify-center p-8 h-80 md:h-auto">
          <div className="text-center">
            <img
              src={login}
              alt="Illustration"
              className="mb-4 max-w-full h-45 object-contain"
            />
            <h3 className="text-xl text-white font-semibold">Welcome Back</h3>
            <p className="text-white mt-2 font-weight-bold">
              Login to see your expenses and decide on your future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
