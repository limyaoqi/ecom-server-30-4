const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  addNewOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/order");
const { isUserValid, isAdmin } = require("../middleware/auth");

router.get("/",isUserValid, async (req, res) => {
  try {
    const order = await getOrders(req.user);
    return res.status(200).send(order);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await getOrder(req.params.id);
    return res.status(200).send(order);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const totalPrice = req.body.totalPrice;
    const products = req.body.products;
    const status = req.body.status;
    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice,
      status
    );
    return res.status(200).send({ newOrder, msg: "Order Added Successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id",isAdmin, async (req, res) => {
  try {
    await deleteOrder(req.params.id);
    return res.status(200).send("Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id",isAdmin, async (req, res) => {
  try {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const totalPrice = req.body.totalPrice;
    const products = req.body.products;
    const status = req.body.status;
    const updatedOrder = await updateOrder(
      req.params.id,
      customerName,
      customerEmail,
      products,
      totalPrice,
      status
    );
    return res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
