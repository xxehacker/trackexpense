import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addTransactionApi } from "../../services/transactions/transactionService";
import { listCategoryApi } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});

const AddTransaction = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: listCategoryApi,
  });
  const categoriesList = data?.categories || [];

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addTransactionApi,
    mutationKey: ["addTransaction"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values).catch((error) => {
        console.error("Error adding transaction:", error);
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            New Transaction
          </h2>
          <p className="text-gray-600">Track your finances with ease</p>
        </div>

        {(isError || isSuccess) && (
          <div className="mb-4">
            {isError && (
              <AlertMessage
                type="error"
                message={error?.response?.data?.message || "Error occurred"}
              />
            )}
            {isSuccess && (
              <AlertMessage
                type="success"
                message="Transaction added successfully"
              />
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="group">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FaWallet className="text-indigo-500" />
              <span>Type</span>
            </label>
            <select
              {...formik.getFieldProps("type")}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
            >
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <p className="mt-1 text-rose-500 text-xs">{formik.errors.type}</p>
            )}
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FaDollarSign className="text-indigo-500" />
              <span>Amount</span>
            </label>
            <input
              type="number"
              {...formik.getFieldProps("amount")}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="Enter amount"
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="mt-1 text-rose-500 text-xs">{formik.errors.amount}</p>
            )}
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FaRegCommentDots className="text-indigo-500" />
              <span>Category</span>
            </label>
            <select
              {...formik.getFieldProps("category")}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
            >
              <option value="">Select category</option>
              {categoriesList?.map(
                (category) =>
                  category && (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  )
              )}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="mt-1 text-rose-500 text-xs">{formik.errors.category}</p>
            )}
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FaCalendarAlt className="text-indigo-500" />
              <span>Date</span>
            </label>
            <input
              type="date"
              {...formik.getFieldProps("date")}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
            />
            {formik.touched.date && formik.errors.date && (
              <p className="mt-1 text-rose-500 text-xs">{formik.errors.date}</p>
            )}
          </div>

          <div className="group md:col-span-2 lg:col-span-2">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <FaRegCommentDots className="text-indigo-500" />
              <span>Description (Optional)</span>
            </label>
            <textarea
              {...formik.getFieldProps("description")}
              rows="2"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
              placeholder="Add notes about your transaction"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
          >
            {isPending ? "Processing..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;