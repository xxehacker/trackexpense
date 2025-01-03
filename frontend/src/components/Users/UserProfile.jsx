import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateProfileApi } from "@/services/users/userServices";
import { toast } from "react-toastify";
import AlertMessage from "../Alert/AlertMessage";

const profileValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
});

const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const UserProfile = () => {
  const { mutateAsync, isPending, error, isError, isSuccess } = useMutation({
    mutationFn: updateProfileApi,
    mutationKey: ["updateProfile"],
  });

  const profileFormik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values) => {
      mutateAsync(values)
        .then(() => {
          toast.success("Profile updated successfully");
          profileFormik.resetForm();
          // I am storing the updated user data like username and email in local storage with existing data like id, token, message. I just update the username and email in local storage
          const userData = JSON.parse(localStorage.getItem("userInfo"));
          const updatedUserData = {
            ...userData,
            username: values.username,
            email: values.email,
          };
          localStorage.setItem("userInfo", JSON.stringify(updatedUserData));
        })
        .catch((error) => {
          toast.error("Profile update failed");
        });
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      console.log("Password update:", values);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <div className="inline-block p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          <FaUserCircle className="text-5xl text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome To Your Profile
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your profile and update your information.
        </p>
      </div>

      {/* Main Content - Horizontal Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            Update Profile
          </h3>

          <form onSubmit={profileFormik.handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="group relative">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <FaUserCircle className="text-2xl text-blue-500" />
                <div className="flex-1">
                  <label
                    htmlFor="username"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    {...profileFormik.getFieldProps("username")}
                    type="text"
                    id="username"
                    className="mt-1 block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue-500 transition-colors bg-transparent text-gray-800"
                    placeholder="Your username"
                  />
                </div>
              </div>
              {profileFormik.touched.username &&
                profileFormik.errors.username && (
                  <span className="absolute -bottom-5 left-0 text-sm text-red-500">
                    {profileFormik.errors.username}
                  </span>
                )}
            </div>

            {/* Email Field */}
            <div className="group relative">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <FaEnvelope className="text-2xl text-blue-500" />
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...profileFormik.getFieldProps("email")}
                    className="mt-1 block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue-500 transition-colors bg-transparent text-gray-800"
                    placeholder="Your email"
                  />
                </div>
              </div>
              {profileFormik.touched.email && profileFormik.errors.email && (
                <span className="absolute -bottom-5 left-0 text-sm text-red-500">
                  {profileFormik.errors.email}
                </span>
              )}
            </div>

            {/* Profile Save Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Password Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            Change Password
          </h3>

          <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
            <div className="group relative">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                <AiOutlineLock className="text-2xl text-blue-500" />
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
                    {...passwordFormik.getFieldProps("password")}
                    className="mt-1 block w-full border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue-500 transition-colors bg-transparent text-gray-800"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              {passwordFormik.touched.password &&
                passwordFormik.errors.password && (
                  <span className="absolute -bottom-5 left-0 text-sm text-red-500">
                    {passwordFormik.errors.password}
                  </span>
                )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
