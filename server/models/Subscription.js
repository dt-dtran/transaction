const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  customers: [
    {
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      joinDate: {
        type: Date,
        default: Date.now,
      },
      leaveDate: {
        type: Date,
        default: null,
      },
    },
  ],
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
