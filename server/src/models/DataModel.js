const { Schema, model } = require("mongoose");

const dataSchema = new Schema(
  {
    client: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    generalDate: {
      type: String,
    },
    sign: {
      type: String,
    },
    companyName: {
      type: String,
    },
    representative: {
      type: String,
    },
    transporterName: {
      type: String,
    },
    transporterAddress: {
      type: String,
    },
    transporterPhoneNumber: {
      type: String,
    },
    transporterDate: {
      type: String,
    },
    contact: {
      type: String,
    },
    referenceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },

  {
    timestamps: true,
  }
);

exports.Data = model("Data", dataSchema);
