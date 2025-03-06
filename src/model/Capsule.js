import mongoose from 'mongoose';

const CapsuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  visibility: {
    type: String,
    enum: ['private', 'public'],
    default: 'private',
  },
  mediaAttachments: [{
    url: String,
    type: String, // 'image', 'video', 'audio', 'document'
  }],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sharedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  password: {
    type: String,
    required: false,
  },
  isEncrypted: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
  }],
  location: {
    type: String,
    required: false,
  },
  timezone: {
    type: String,
    required: false,
  }
}, { timestamps: true });

export default mongoose.models.Capsule || mongoose.model('Capsule', CapsuleSchema);
