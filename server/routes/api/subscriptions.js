const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Create a new subscription
router.post("/", subscriptionController.createSubscription);

// Get all subscriptions
router.get("/", subscriptionController.getAllSubscriptions);

// Get a specific subscription by ID
router.get("/:id", subscriptionController.getSubscriptionById);

// Update a subscription by ID
router.put("/:id", subscriptionController.updateSubscriptionById);

// Delete a subscription by ID
router.delete("/:id", subscriptionController.deleteSubscriptionById);

module.exports = router;
