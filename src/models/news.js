const mongoose = require("mongoose");
const slugify = require("slugify");

const newsSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    localizedContent: {
      type: Map,
      of: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
      },
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate slug
newsSchema.pre("save", async function (next) {
  if (!this.slug && this.localizedContent.has("en")) {
    this.slug = slugify(this.localizedContent.get("en").title, {
      lower: true,
      strict: true,
    });

    let uniqueSlug = this.slug;
    let counter = 1;
    while (await mongoose.models.News.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${this.slug}-${counter}`;
      counter++;
    }
    this.slug = uniqueSlug;
  }
  next();
});

module.exports = mongoose.model("News", newsSchema);
