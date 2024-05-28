const { default: axios } = require("axios");
const Order = require("../models/Order");
const {
  BILLPLZ_API_URL,
  BILLPLZ_API_KEY,
  BILLPLZ_X_SIGNATURE,
  BILLPLZ_COLLECTION_ID,
  FRONTEND_URL
} = require("../config");

const getOrders = async (user) => {
  try {
    let filters = {};
    if (user && user.role === "user") {
      filters.customerEmail = user.email;
    }
    const orders = await Order.find(filters).sort({ _id: -1 });
    return orders;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrder = async (id) => {
  try {
    const orders = await Order.findById(id);
    if (orders) {
      return orders;
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const addNewOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice,
  status
) => {
  try {
    // 1. create a bill in billplz
    const billplz = await axios({
      method: "post",
      url: BILLPLZ_API_URL + "v3/bills",
      auth: {
        username: BILLPLZ_API_KEY,
        password: "",
      },
      data: {
        collection_id: BILLPLZ_COLLECTION_ID,
        email: customerEmail,
        name: customerName,
        amount: parseFloat(totalPrice) * 100,
        description: "Payment for Order",
        callback_url: FRONTEND_URL+`verify_payment`,
        redirect_url: FRONTEND_URL+"verify_payment",
      },
    });

    // 2. retrieve the bill_url and bill id
    const billplz_id = billplz.data.id;
    const billplz_url = billplz.data.url;

    // 3. create a new order
    const newOrder = new Order({
      customerName,
      customerEmail,
      products,
      totalPrice,
      status,
      billplz_id,
    });
    await newOrder.save();

    // 4. return back the new order with bill_url
    return { ...newOrder, billplz_url };
  } catch (error) {
    throw new Error(error);
  }
};

const updateOrder = async (
  id,
  customerName,
  customerEmail,
  products,
  totalPrice,
  status
) => {
  try {
    const order = await Order.findById(id);
    if (!order) throw new Error("Order not found");
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        customerName,
        customerEmail,
        products,
        totalPrice,
        status,
      },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);
  try {
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
