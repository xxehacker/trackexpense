import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerApi } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { useNavigate } from "react-router-dom";
import register from "../../assets/register.svg";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerApi,
    mutationKey: ["register"],
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex items-center justify-center p-4 md:w-full min-h-[90vh] bg-gradient-to-r from-blue-500 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl overflow-hidden border border-gray-400 flex-col-reverse md:flex-row ">
        {/* Left Section */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 underline text-center">
            Register
          </h2>

          {isPending && <AlertMessage type="info" message="Loading..." />}
          {isError && (
            <AlertMessage
              type="error"
              message={error.response?.data?.message}
            />
          )}
          {isSuccess && (
            <AlertMessage type="success" message="Registration Successful!" />
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* Username Input */}
            <div className="mb-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-4">
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
            <div className="mb-4">
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

            {/* Confirm Password Input */}
            <div className="mb-6">
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="h-96 md:h-auto w-full md:w-1/2 bg-sky-500 flex items-center justify-center p-8">
          <div className="text-center">
            <img
              src={register}
              alt="Illustration"
              className="mb-4 max-w-full h-auto"
            />
            <h3 className="text-xl font-semibold text-white">
              Join Our Platform
            </h3>
            <p className=" text-white mt-2">
              Sign up to explore more features and functionalities of our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
