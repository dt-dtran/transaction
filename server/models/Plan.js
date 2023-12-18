const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // subscriptionCount: {
  //   type: Number,
  // },
  priceUSD: {
    type: Number,
    required: true,
  },
  defaultCurrency: {
    type: String,
    required: true,
    default: "USD",
  },
  pricelist: [
    {
      conversionPrice: Number,
      currency: String,
    },
  ],
  interval: {
    type: String,
    required: true,
    default: "monthly",
  },
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
  ],
});

// Define a virtual property to calculate subscriptionCount
planSchema.virtual("subscriptionCount").get(function () {
  return this.subscriptions.length;
});

// Ensure the virtual property is included when converting to JSON or using utilities like res.send
planSchema.set("toJSON", { virtuals: true });

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
