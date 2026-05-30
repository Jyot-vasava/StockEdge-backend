import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    source: String,
    url: String,
    category: { type: String, enum: ['market', 'company', 'ipo', 'policy', 'global'], default: 'market' },
    symbols: [String],
    summary: String,
    sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' },
    impact: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    publishedAt: Date,
  },
  { timestamps: true },
)

const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    excerpt: String,
    body: String,
    tags: [String],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true },
)

const ipoSchema = new mongoose.Schema(
  {
    company: String,
    priceBand: String,
    lotSize: Number,
    openDate: Date,
    closeDate: Date,
    listingDate: Date,
    subscription: Number,
    gmp: String,
    status: { type: String, enum: ['upcoming', 'open', 'closed', 'listed'], default: 'upcoming' },
  },
  { timestamps: true },
)

export const News = mongoose.model('News', newsSchema)
export const Blog = mongoose.model('Blog', blogSchema)
export const Ipo = mongoose.model('Ipo', ipoSchema)
