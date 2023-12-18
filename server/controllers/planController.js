const Plan = require("../models/Plan");

const planController = {
  // Create a new plan
  createPlan: async (req, res) => {
    try {
      const newPlan = await Plan.create(req.body);
      res.status(201).json(newPlan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get all plans
  getAllPlans: async (req, res) => {
    try {
      const plans = await Plan.find();
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get a specific plan by ID
  getPlanById: async (req, res) => {
    try {
      const plan = await Plan.findById(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      res.status(200).json(plan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Update a plan by ID
  updatePlanById: async (req, res) => {
    try {
      const updatedPlan = await Plan.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPlan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      res.status(200).json(updatedPlan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Delete a plan by ID
  deletePlanById: async (req, res) => {
    try {
      const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
      if (!deletedPlan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = planController;
