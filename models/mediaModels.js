import mongoose from "mongoose";

const CTI = new mongoose.Schema(
  {
    url: { type: String, unique: true, required: true, lowercase: true },
    risklevel: {
      type: String,
      required: true,
      enum: ["Critical", "Moderate", "Low"],
      default: "Moderate",
    },
    category: {
      type: String,
      enum: [
        "Phishing",
        "Malware",
        "Ransomware",
        "Scam",
        "Defacement",
        "Other",
      ],
    },
    virusTotalScore: { type: Number, required: true, default: 0 },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true },
);

const CTISchema =  mongoose.model("CTI", CTI);

export { CTISchema };
