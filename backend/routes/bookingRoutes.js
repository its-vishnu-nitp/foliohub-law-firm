const router = require("express").Router();
const Booking = require("../models/Booking");
const isString = (v, min, max) =>
  typeof v === "string" && v.trim().length >= min && v.trim().length <= max;
router.post("/", async (req, res, next) => {
  try {
    const { name, phone, email, service, date, message = "" } = req.body || {};
    if (
      !isString(name, 2, 100) ||
      !isString(phone, 7, 30) ||
      !/^[0-9+()\- .]{7,30}$/.test(phone) ||
      !isString(email, 3, 254) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !isString(service, 2, 100) ||
      !isString(date, 10, 10) ||
      (message !== "" && !isString(message, 1, 1000))
    )
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide valid booking details.",
        });
    const selected = new Date(`${date}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(selected.getTime()) ||
      selected.toISOString().slice(0, 10) !== date
    )
      return res
        .status(400)
        .json({ success: false, message: "Please select a valid date." });
    const today = new Date().toISOString().slice(0, 10);
    // Date is interpreted as a calendar date, not a confirmed appointment time.
    if (date < today)
      return res
        .status(400)
        .json({
          success: false,
          message: "Please select a current or future date.",
        });
    const booking = await Booking.create({
      name,
      phone,
      email,
      service,
      date,
      message,
    });
    return res
      .status(201)
      .json({
        success: true,
        message: "Consultation request received; confirmation is pending.",
        bookingId: booking.id,
        status: booking.status,
      });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
