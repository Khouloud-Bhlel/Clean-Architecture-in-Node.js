const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

class UserRepository {
  async findAll() {
    return UserModel.find().select('-password');
  }

  async findById(id) {
    return UserModel.findById(id).select('-password');
  }

  async create(userData) {
    const user = new UserModel(userData);
    return user.save();
  }

  async update(id, userData) {
    return UserModel.findByIdAndUpdate(id, userData, { new: true }).select('-password');
  }

  async delete(id) {
    return UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserRepository; 