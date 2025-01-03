const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact.model");

const contactController = {
  contact: asyncHandler(async (req, res) => {
    try {
      const { firstName, lastName, email, phone, message } = req.body;

      if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailValidation.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
      }

      if (phone.length !== 10) {
        return res
          .status(400)
          .json({ message: "Please enter a valid phone number" });
      }

      if (message.length < 7) {
        return res
          .status(400)
          .json({ message: "Message must be at least 7 characters long" });
      }

      const contact = await Contact.create({
        firstName,
        lastName,
        email,
        phone,
        message,
      });
      res.status(201).json({
        message: "Message recorded successfully",
        contactId: contact._id,
      });
    } catch (error) {
      console.error("Contact Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }),
};
module.exports = contactController;
