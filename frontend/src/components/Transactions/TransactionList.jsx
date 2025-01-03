import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  deleteTransactionApi,
  listTransactionApi,
} from "../../services/transactions/transactionService";
import { Link, useParams } from "react-router-dom";
import { listCategoryApi } from "../../services/category/categoryService";
import { toast } from "react-toastify";

const TransactionList = () => {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const {
    data: categoryData,
    isError: isCategoryError,
    isLoading: isCatLoading,
  } = useQuery({
    queryFn: listCategoryApi,
    queryKey: ["list-categories"],
  });

  const categories = categoryData?.categories || [];

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => listTransactionApi(filters),
  });

  // delete transaction
  const {
    mutateAsync: deleteTransaction,
    isPending: isDeleting,
    isError: isUpdateTransactionError,
    error: updateTransactionError,
    isSuccess: isDeleted,
  } = useMutation({
    mutationFn: deleteTransactionApi,
    mutationKey: ["delete-transaction"],
  });

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete transaction");
    }
  };

  if (isDeleted) {
    window.location.reload();
  }

  return (
    <div className="my-8 mx-4 md:mx-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl shadow-2xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <input
          type="date"
          value={filters.startDate}
          onChange={handleFilterChange}
          name="startDate"
          className="px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 bg-white shadow-md transition-all duration-300"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 bg-white shadow-md transition-all duration-300"
        />
        <div className="relative">
          <select
            name="type"
            className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 bg-white shadow-md transition-all duration-300 appearance-none"
            onChange={handleFilterChange}
            value={filters.type}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
        </div>
        <div className="relative">
          <select
            name="category"
            className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 bg-white shadow-md transition-all duration-300 appearance-none"
            onChange={handleFilterChange}
            value={filters.category}
          >
            <option value="">All Categories</option>
            <option value="Uncategorized">Uncategorized</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
        </div>
      </div>

      <div className="mt-8 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Transactions
        </h3>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-300 border-t-purple-600"></div>
          </div>
        ) : isError ? (
          <p className="text-red-500 text-center py-8">{error?.message}</p>
        ) : (
          <div className="space-y-6">
            {transactions?.map((transaction) => (
              <div
                key={transaction.id}
                className="group bg-white p-6 rounded-2xl border border-purple-100 hover:border-purple-400 shadow-md hover:shadow-lg transition-all duration-300 flex justify-between items-center"
              >
                <div className="flex items-center space-x-6">
                  <div
                    className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full text-xl font-bold shadow-inner ${
                      {
                        income: "bg-green-50 text-green-600",
                        expense: "bg-red-50 text-red-600",
                      }[transaction.type]
                    }`}
                  >
                    ${transaction.amount.toLocaleString()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-800">
                        {transaction.category?.name}
                      </span>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
                          {
                            income: "bg-green-200 text-green-800",
                            expense: "bg-red-200 text-red-800",
                          }[transaction.type]
                        }`}
                      >
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      {transaction.description}
                    </p>
                    <span className="text-sm text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/update-transaction/${transaction._id}`}
                    className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="p-3 text-red-600 hover:bg-red-100 rounded-full transition-all shadow-sm"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
