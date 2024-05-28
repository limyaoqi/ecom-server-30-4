const express = require("express");
const router = express.Router();
const verifyPayment = require("../controllers/payment");

router.post("/", async (req, res) => {
  try {
    const { billplz_id, billplz_paid, billplz_paid_at, billplz_x_signature } =
      req.body;
    const order = await verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    );
    return res.send(order)
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

module.exports = router