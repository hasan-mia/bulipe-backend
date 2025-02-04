const { mongoose } = require('mongoose')

const programSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  programCode: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["digital-skills", "it-service", "web-development", "data-analytics"],
  },
  localizedContent: {
    type: Map,
    of: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      overview: { type: String, required: true },
      requirements: [{ type: String }],
      outcomes: [{ type: String }],
      curriculum: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          duration: { type: String, required: true },
        },
      ],
    },
    required: true,
  },
  startDates: [
    {
      type: Date,
    },
  ],
},
  {
    timeStamp: true,
  })

module.exports = mongoose.model('Program', programSchema)
