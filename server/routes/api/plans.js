const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

// Create a new plan
router.post("/", planController.createPlan);

// Get all plans
router.get("/", planController.getAllPlans);

// Get a specific plan by ID
router.get("/:id", planController.getPlanById);

// Update a plan by ID
router.put("/:id", planController.updatePlanById);

// Delete a plan by ID
router.delete("/:id", planController.deletePlanById);

module.exports = router;
