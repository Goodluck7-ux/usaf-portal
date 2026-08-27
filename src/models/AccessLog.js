import mongoose, { Schema } from 'mongoose';

const AccessLogSchema = new Schema({
    portfolioId: { type: String, required: true, index: true },
    action: String, // 'Login Success' | 'Document Viewed' | 'Dashboard Access' | 'Login Failed'
    location: String,
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.AccessLog || mongoose.model('AccessLog', AccessLogSchema);