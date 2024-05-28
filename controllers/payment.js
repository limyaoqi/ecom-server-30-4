const crypto = require("crypto");
const { BILLPLZ_X_SIGNATURE } = require("../config");
const Order = require("../models/Order");

const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
  const x_signature = crypto
    .createHmac("sha256", BILLPLZ_X_SIGNATURE)
    .update(billplz_string)
    .digest("hex");
  if (x_signature !== billplz_x_signature) {
    throw new Error("Signature not valid");
  } else {
    const order = await Order.findOne({ billplz_id: billplz_id });
    if (!order) {
      throw new Error("Order not found");
    } else {
      order.status = billplz_paid === "true" ? "paid" : "failed";
      order.paid_at = billplz_paid_at;

      const updateOrder = await order.save();
      return updateOrder;
    }
  }
};

module.exports = verifyPayment;
