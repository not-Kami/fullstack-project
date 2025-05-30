import mongoose from 'mongoose';

export const USER_ROLES = ['admin', 'editor', 'user'];

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
  },
  role: {
    type: String,
    enum: USER_ROLES,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true }); // createdAt and updatedAt

userSchema.index({ deletedAt: 1 });

userSchema.pre('find', function() {
  this.where({ deletedAt: null });
});

userSchema.pre('findOne', function() {
  this.where({ deletedAt: null });
});

export const User = mongoose.model('User', userSchema);