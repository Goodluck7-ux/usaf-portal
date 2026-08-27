import mongoose, { Schema } from 'mongoose';

const PortfolioSchema = new Schema({
    portfolioId: { type: String, unique: true, required: true },
    officerName: String,
    rank: String,
    accessCode: { type: String, required: true }, // hash this in seed script
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'restricted', 'frozen'], default: 'frozen' },
    totalValue: Number,
    assets: {
        retirement: Number,
        investments: Number,
        realAssets: Number,
        other: Number,
    },
    allocation: {
        equities: Number,
        retirement401k: Number,
        fixedIncome: Number,
        realEstate: Number,
        cashEquivalents: Number,
    },
    restriction: {
        authority: String,
        effectiveDate: Date,
        reviewDate: Date,
        reason: String,
        lockedActions: [String],
    },

}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);