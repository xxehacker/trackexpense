import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addCategoryApi } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addCategoryApi,
    mutationKey: ["addCategory"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values).catch((error) => {
        console.log(error);
      });
    },
  });

  return (
    <div className="min-h-[90vh] bg-gradient-to-r from-green-400 via-green-300 to-green-200 flex items-center justify-center p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white rounded-none shadow-lg p-8 space-y-6"
      >
        <div className="border-l-4 border-slate-900 pl-4">
          <h2 className="text-2xl font-bold text-slate-900">Add Category</h2>
          <p className="text-slate-500 text-sm mt-1">Create new transaction category</p>
        </div>

        {isError && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "Error occurred"}
          />
        )}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Category added successfully"
          />
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="type"
              className="flex items-center gap-2 text-slate-600 text-sm font-medium mb-2"
            >
              <FaWallet className="text-slate-400" />
              <span>TYPE</span>
            </label>
            <select
              {...formik.getFieldProps("type")}
              id="type"
              className="w-full p-3 bg-slate-50 border-b-2 border-slate-200 focus:border-slate-900 outline-none transition-colors"
            >
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <p className="mt-1 text-red-500 text-xs">{formik.errors.type}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-slate-600 text-sm font-medium mb-2"
            >
              <SiDatabricks className="text-slate-400" />
              <span>NAME</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="Enter category name"
              id="name"
              className="w-full p-3 bg-slate-50 border-b-2 border-slate-200 focus:border-slate-900 outline-none transition-colors"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-red-500 text-xs">{formik.errors.name}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 text-white py-4 px-6 mt-8 hover:bg-slate-800 transition-colors"
        >
          {isPending ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;