const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");

const transactionControllers = {
  // create transaction controller
  create: asyncHandler(async (req, res) => {
    try {
      const { type, category, amount, date, description } = req.body;

      if (!type || !amount || !date) {
        return res
          .status(400)
          .json({ message: "Type , amount and date are required" });
      }
      const transaction = await Transaction.create({
        user: req.user,
        type,
        category,
        amount,
        date,
        description,
      });

      res.status(200).json({
        message: "Transaction created successfully",
        transaction,
      });
    } catch (error) {}
  }),

  // list transactions controller
  getFilteredTransactions: asyncHandler(async (req, res) => {
    try {
      const { startDate, endDate, type, category } = req.query;

      let filters = { user: req.user };
      if (startDate) {
        filters.date = { ...filters.date, $gte: new Date(startDate) };
      }
      if (endDate) {
        filters.date = { ...filters.date, $lte: new Date(endDate) };
      }
      if (type) {
        filters.type = type;
      }
      if (category) {
        if (category === "All") {
          //!  No category filter needed when filtering for 'All'
        } else if (category === "Uncategorized") {
          //! Filter for transactions that are specifically categorized as 'Uncategorized'
          filters.category = "Uncategorized";
        } else {
          filters.category = category;
        }
      }
      const transactions = await Transaction.find(filters).sort({ date: -1 });
      return res.status(200).json(transactions);
    } catch (error) {
      console.error("Transaction List Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),

  // update transaction controller
  update: asyncHandler(async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);

      if (!transaction) {
        return res.status(400).json({ message: "Transaction not found" });
      }
      console.log(req.user);
      // check if the transaction belongs to the user
      if (transaction && transaction.user.toString() === req.user.toString()) {
        transaction.type = req.body.type || transaction.type;
        transaction.category = req.body.category || transaction.category;
        transaction.amount = req.body.amount || transaction.amount;
        transaction.date = req.body.date || transaction.date;
        transaction.description =
          req.body.description || transaction.description;

        //  update
        const updatedTransaction = await transaction.save();
        return res.status(200).json(updatedTransaction);
      }
    } catch (error) {
      console.error("Transaction Update Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),

  // delete transaction controller
  delete: asyncHandler(async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (transaction && transaction.user.toString() === req.user.toString()) {
        await Transaction.findByIdAndDelete(req.params.id);
        return res
          .status(200)
          .json({ message: "Transaction deleted successfully" });
      }
    } catch (error) {
      console.error("Transaction Delete Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),
};

module.exports = transactionControllers;
