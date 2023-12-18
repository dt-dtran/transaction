const Invoice = require("../models/Invoice");
const User = require("../models/User");
const Subscription = require("../models/Subscription");

function calculateMonthlyBill(month, active_subscription) {
  // Validate input parameters
  if (!month || !active_subscription) {
    return 0;
  }

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();
  const dailyRate = active_subscription.plan.priceUSD / daysInMonth;

  let runningTotal = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(month.getFullYear(), month.getMonth(), day);
    const activeUsersForDay = active_subscription.customers.filter(
      (customer) =>
        customer.joinDate <= currentDate &&
        (!customer.leaveDate || customer.leaveDate > currentDate)
    );

    const dailyTotal = activeUsersForDay.reduce(
      (total, customer) => total + dailyRate,
      0
    );

    runningTotal += dailyTotal;

    console.log(
      `${currentDate.toISOString().slice(0, 10)}: ${
        activeUsersForDay.length
      } active users * $${dailyRate.toFixed(8)} = $${dailyTotal.toFixed(
        8
      )} (subtotal: $${runningTotal.toFixed(8)})`
    );
  }
  // Round the running total to 2 decimal places
  return parseFloat(runningTotal.toFixed(2));
}
// Controller for handling invoice-related operations
const invoiceController = {
  getAllInvoices: async (req, res) => {
    try {
      const invoices = await Invoice.find().sort({ issueDate: -1 });
      res.json(invoices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getInvoiceById: async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      res.json(invoice);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createInvoice: async (req, res) => {
    try {
      // Check if the subscription exists
      const subscriptionId = await Subscription.findById(
        req.body.subscriptionId
      );
      if (!subscriptionId) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Check if the subsciption is Inactive
      if (!subscriptionId.isActive) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      // Calculate Monthly Bill
      const users = subscriptionId.customers;
      const month = new Date();
      const totalBill = calculateMonthlyBill(month, subscriptionId);

      // Create a new invoice
      const newInvoice = new Invoice({ ...req.body, total: totalBill });
      const savedInvoice = await newInvoice.save();
      res.status(201).json(savedInvoice);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateInvoice: async (req, res) => {
    try {
      const updatedInvoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedInvoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      res.json(updatedInvoice);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteInvoice: async (req, res) => {
    try {
      const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
      if (!deletedInvoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      res.json({ message: "Invoice deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getInvoicesDueThisMonth: async (req, res) => {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1); // Set the day to the first day of the month

      const endOfMonth = new Date();
      endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0); // Set the day to the last day of the month

      const invoicesDueThisMonth = await Invoice.find({
        dueDate: { $gte: startOfMonth, $lt: endOfMonth },
      }).sort({ dueDate: 1 });

      res.json(invoicesDueThisMonth);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getOverdueInvoices: async (req, res) => {
    try {
      const currentDate = new Date();

      const overdueInvoices = await Invoice.find({
        paymentStatus: "Incomplete",
        dueDate: { $lt: currentDate },
      }).sort({ dueDate: 1 });

      res.json(overdueInvoices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = invoiceController;

// Example usage:
const month = new Date("2019-01-01");
const subscription = {
  id: "subscription_id",
  customers: [
    {
      customerId: "customer_id1",
      joinDate: new Date("2018-11-04"),
      leaveDate: null,
    },
    {
      customerId: "customer_id2",
      joinDate: new Date("2018-12-04"),
      leaveDate: null,
    },
    {
      customerId: "customer_id3",
      joinDate: new Date("2019-01-10"),
      leaveDate: null,
    },
  ],
  plan: {
    priceUSD: 4.0,
  },
  startDate: new Date("2018-11-04"),
  endDate: null, // Set to null if the subscription is active
};

const totalBill = calculateMonthlyBill(month, subscription);
console.log(`Total Monthly Bill: $${totalBill}`);
