import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionApi } from "../../services/transactions/transactionService";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: listTransactionApi,
  });

  const total = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += transaction?.amount;
      } else {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transaction Overview",
        data: [total?.income, total?.expense],
        backgroundColor: ["#3B82F6", "#EF4444"],
        borderColor: ["#3B82F6", "#EF4444"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 20,
          font: {
            size: 14,
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="my-8 p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Transaction Overview
      </h1>
      <div className="relative flex justify-center items-center" style={{ height: "350px" }}>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">Error loading transactions.</p>
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default TransactionChart;
