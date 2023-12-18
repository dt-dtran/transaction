const express = require("express");
const router = express.Router();
const Invoice = require("../../controllers/invoiceController");

// Get all invoices
router.get("/", invoiceController.getAllInvoices);

// Get a specific invoice by ID
router.get("/:id", invoiceController.getInvoiceById);

// Create a new invoice
router.post("/", invoiceController.createInvoice);

// Update an existing invoice by ID
router.put("/:id", invoiceController.updateInvoice);

// Delete an invoice by ID
router.delete("/:id", invoiceController.deleteInvoice);

// Get invoices due this month
router.get("/due", invoiceController.getInvoicesDueThisMonth);

// Get invoices overdue
router.get("/overdue", invoiceController.getOverdueInvoices);

module.exports = router;
