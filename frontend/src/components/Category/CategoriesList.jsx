import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteCategoryApi,
  listCategoryApi,
} from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryFn: listCategoryApi,
    queryKey: ["list-categories"],
  });
  const categories = data?.categories || [];

  const {
    mutateAsync,
    isPending,
    isError: isErr,
    error: err,
    isSuccess,
  } = useMutation({
    mutationFn: deleteCategoryApi,
    mutationKey: ["deleteCategory"],
  });

  const handleDelete = async (id) => {
    mutateAsync(id)
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Categories
          </h2>

          {isLoading && (
            <AlertMessage type={"Loading"} message="Loading categories..." />
          )}
          {isError && (
            <AlertMessage
              type={"Error"}
              message={`Error fetching categories: ${error.message}`}
            />
          )}

          {categories.length > 0 ? (
            <ul className="space-y-4">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg border-l-4 hover:scale-102 transition-transform duration-200"
                  style={{
                    borderLeftColor: category.type === "income" ? "#10B981" : "#EF4444"
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-gray-800">
                        {category.name}
                      </span>
                      <span
                        className={`text-sm px-3 py-1 rounded-full w-fit ${
                          category.type === "income"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Link 
                      to={`/update-category/${category._id}`}
                      className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No categories found</p>
              <Link 
                to="/add-category"
                className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Add Your First Category
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;