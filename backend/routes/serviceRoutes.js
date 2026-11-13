const router = require("express").Router();
const Service = require("../models/Service");
router.get("/", async (req, res, next) => {
  try {
    res.json(
      await Service.find({})
        .sort({ sortOrder: 1, name: 1 })
        .select("name description -_id")
        .lean(),
    );
  } catch (err) {
    next(err);
  }
});
module.exports = router;
