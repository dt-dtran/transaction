const Subscription = require("../models/Subscription");
const subscriptionController = {
  // Create a new subscription
  createSubscription: async (req, res) => {
    try {
      const newSubscription = await Subscription.create(req.body);
      res.status(201).json(newSubscription);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get all subscriptions
  getAllSubscriptions: async (req, res) => {
    try {
      const subscriptions = await Subscription.find();
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Get a specific subscription by ID
  getSubscriptionById: async (req, res) => {
    try {
      const subscription = await Subscription.findById(req.params.id);
      if (!subscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Update a subscription by ID
  updateSubscriptionById: async (req, res) => {
    try {
      const updatedSubscription = await Subscription.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedSubscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      res.status(200).json(updatedSubscription);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Delete a subscription by ID
  deleteSubscriptionById: async (req, res) => {
    try {
      const deletedSubscription = await Subscription.findByIdAndDelete(
        req.params.id
      );
      if (!deletedSubscription) {
        return res.status(404).json({ error: "Subscription not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = subscriptionController;
