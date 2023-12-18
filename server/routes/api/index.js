const express = require("express");
const router = express.Router();

const invoicesRoutes = require("./invoices");
const usersRoutes = require("./users");
const plansRoutes = require("./plans");
const subscriptionsRoutes = require("./subscriptions");

router.use("/invoices", invoicesRoutes);
router.use("/users", usersRoutes);
router.use("/plans", plansRoutes);
router.use("/subscription", subscriptionsRoutes);

module.exports = router;
