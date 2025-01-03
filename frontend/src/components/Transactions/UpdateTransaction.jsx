import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { BsCurrencyDollar, BsCalendar3, BsTextLeft } from "react-icons/bs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateTransactionApi } from "@/services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";
import { listCategoryApi } from "@/services/category/categoryService";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  type: Yup.string().oneOf(["income", "expense"]),
  category: Yup.string(),
  amount: Yup.number().positive("Amount must be positive"),
  date: Yup.date(),
  description: Yup.string(),
});

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: categoryData,
    isError: isCategoryError,
    isLoading: isCatLoading,
  } = useQuery({
    queryFn: listCategoryApi,
    queryKey: ["list-categories"],
  });

  const categories = categoryData?.categories || [];

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateTransactionApi,
    mutationKey: ["updateTransaction"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      category: "",
      amount: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        id,
      };
      mutateAsync(data)
        .then((data) => {
          toast.success("Transaction updated successfully");
          console.log(data);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  console.log(id);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-2">
            Update Transaction
          </h2>
          <div className="h-1 w-24 bg-indigo-500 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-400">
            Modify your transaction details below
          </p>
        </div>

        {/* Main Form Container */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Alert Messages */}
          {isError && (
            <div className="mb-6">
              <AlertMessage
                type="error"
                message={
                  error?.response?.data?.message ||
                  "Something happened please try again later"
                }
              />
            </div>
          )}
          {isSuccess && (
            <div className="mb-6">
              <AlertMessage
                type="success"
                message="Transaction updated successfully, redirecting..."
              />
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Left Section */}
              <div className="space-y-6">
                {/* Type Selection */}
                <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm">
                  <label className="flex items-center gap-3 text-slate-200 text-lg mb-3">
                    <FaWallet className="text-indigo-400 text-xl" />
                    Transaction Type
                  </label>
                  <select
                    {...formik.getFieldProps("type")}
                    className="w-full bg-slate-700/50 border-2 border-slate-600 text-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="">Select type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  {formik.touched.type && formik.errors.type && (
                    <p className="text-red-400 text-sm mt-2">
                      {formik.errors.type}
                    </p>
                  )}
                </div>

                {/* Category Selection */}
                <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm">
                  <label className="flex items-center gap-3 text-slate-200 text-lg mb-3">
                    <SiDatabricks className="text-indigo-400 text-xl" />
                    Category
                  </label>
                  <select
                    {...formik.getFieldProps("category")}
                    className="w-full bg-slate-700/50 border-2 border-slate-600 text-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="text-red-400 text-sm mt-2">
                      {formik.errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Middle Section */}
              <div className="space-y-6">
                {/* Amount Input */}
                <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm">
                  <label className="flex items-center gap-3 text-slate-200 text-lg mb-3">
                    <BsCurrencyDollar className="text-indigo-400 text-xl" />
                    Amount
                  </label>
                  <input
                    type="number"
                    {...formik.getFieldProps("amount")}
                    placeholder="Enter amount"
                    className="w-full bg-slate-700/50 border-2 border-slate-600 text-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <p className="text-red-400 text-sm mt-2">
                      {formik.errors.amount}
                    </p>
                  )}
                </div>

                {/* Date Input */}
                <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm">
                  <label className="flex items-center gap-3 text-slate-200 text-lg mb-3">
                    <BsCalendar3 className="text-indigo-400 text-xl" />
                    Date
                  </label>
                  <input
                    type="date"
                    {...formik.getFieldProps("date")}
                    className="w-full bg-slate-700/50 border-2 border-slate-600 text-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  {formik.touched.date && formik.errors.date && (
                    <p className="text-red-400 text-sm mt-2">
                      {formik.errors.date}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Section - Description */}
              <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm h-full">
                <label className="flex items-center gap-3 text-slate-200 text-lg mb-3">
                  <BsTextLeft className="text-indigo-400 text-xl" />
                  Description
                </label>
                <textarea
                  {...formik.getFieldProps("description")}
                  placeholder="Enter description"
                  rows="7"
                  className="w-full bg-slate-700/50 border-2 border-slate-600 text-slate-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-400 text-sm mt-2">
                    {formik.errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Transaction"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTransaction;
