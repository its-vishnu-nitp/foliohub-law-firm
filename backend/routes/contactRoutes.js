const router = require("express").Router();
const Contact = require("../models/Contact");
router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};
    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.length > 100 ||
      typeof email !== "string" ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      email.length > 254 ||
      typeof message !== "string" ||
      message.trim().length < 5 ||
      message.length > 2000
    )
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter a valid name, email and message.",
        });
    await Contact.create({ name, email, message });
    return res
      .status(201)
      .json({ success: true, message: "Message received." });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
