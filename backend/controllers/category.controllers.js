const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");
const Transaction = require("../models/transaction.model");

const categoryControllers = {
  // create category controller
  create: asyncHandler(async (req, res) => {
    try {
      const { name, type } = req.body;

      if (!name || !type) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      const normalizeName = name.toLowerCase();
      const validTypes = ["income", "expense"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ message: "Invalid category type" });
      }

      const categoryExits = await Category.findOne({
        name: normalizeName,
        user: req.user,
      });
      if (categoryExits) {
        return res
          .status(400)
          .json({ message: `Category ${name} already exists` });
      }

      const category = await Category.create({
        name: normalizeName,
        type,
        user: req.user,
      });

      res.status(201).json({
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      console.error("Category Creation Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),

  // list category controller
  lists: asyncHandler(async (req, res) => {
    try {
      const categories = await Category.find({ user: req.user });

      res.status(200).json({
        message: "Categories fetched successfully",
        categories,
      });
    } catch (error) {
      console.error("Category List Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),

  // update category controller
  update: asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(id);
    if (!category || category.user.toString() !== req.user.toString()) {
      return res.status(404).json({ message: "Category not found or user not authorized" });
    }
    const oldName = category.name;

    category.name = normalizedName || category.name;
    category.type = type || category.type;
    const updatedCategory = await category.save();

    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        { user: req.user, category: oldName },
        { $set: { category: updatedCategory.name } }
      );
    }

    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Category Update Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}),


  // delete category controller
  delete: asyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category && category.user.toString() === req.user.toString()) {
        //  Update transactions that have this category
        const defaultCategory = "Uncategorized";
        await Transaction.updateMany(
          { user: req.user, category: category.name },
          { $set: { category: defaultCategory } }
        );

        // Remove category
        await Category.findByIdAndDelete(req.params.id);
        return res.json({
          message: "Category removed and transactions updated",
        });
      } else {
        return res.json({
          message: "Category not found or user not authorized",
        });
      }
    } catch (error) {
      console.error("Category Delete Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),
};

module.exports = categoryControllers;
