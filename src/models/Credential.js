import mongoose, { Schema } from 'mongoose';

const CredentialSchema = new Schema({
    portfolioId: { type: String, required: true, index: true },
    credentialID: { type: String, required: true, unique: true },
    publicKey: { type: String, required: true }, // base64
    counter: { type: Number, default: 0 },
    transports: [String],
}, { timestamps: true });

export default mongoose.models.Credential || mongoose.model('Credential', CredentialSchema);