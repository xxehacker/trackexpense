import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const UpdatePassword = () => {
  const formik = useFormik({
    initialValues: {
      password: "123456",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <div className="inline-block p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          <AiOutlineLock className="text-4xl text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Change Your Password
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto space-y-6">
        <div className="group relative">
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <AiOutlineLock className="text-3xl text-blue-500" />
            <div className="flex-1">
              <label 
                htmlFor="new-password" 
                className="text-sm font-semibold text-gray-700"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                {...formik.getFieldProps("password")}
                className="mt-1 block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue-500 transition-colors bg-transparent text-gray-800 text-lg"
                placeholder="Enter new password"
              />
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="absolute -bottom-5 left-0 text-sm text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full max-w-xs"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;


