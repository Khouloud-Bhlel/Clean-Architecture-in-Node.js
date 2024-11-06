const ResponseHandler = require('../../../utils/response.handler');

class UserController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userUseCase.getAllUsers();
      return ResponseHandler.success(res, users, 'Users retrieved successfully');
    } catch (error) {
      return ResponseHandler.error(res, error.message);
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userUseCase.getUserById(req.params.id);
      if (!user) {
        return ResponseHandler.error(res, 'User not found', 404);
      }
      return ResponseHandler.success(res, user, 'User retrieved successfully');
    } catch (error) {
      return ResponseHandler.error(res, error.message);
    }
  }

  async createUser(req, res) {
    try {
      const user = await this.userUseCase.createUser(req.body);
      return ResponseHandler.success(res, user, 'User created successfully', 201);
    } catch (error) {
      return ResponseHandler.error(res, error.message, 400);
    }
  }

  async updateUser(req, res) {
    try {
      const user = await this.userUseCase.updateUser(req.params.id, req.body);
      if (!user) {
        return ResponseHandler.error(res, 'User not found', 404);
      }
      return ResponseHandler.success(res, user, 'User updated successfully');
    } catch (error) {
      return ResponseHandler.error(res, error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await this.userUseCase.deleteUser(req.params.id);
      if (!result) {
        return ResponseHandler.error(res, 'User not found', 404);
      }
      return ResponseHandler.success(res, null, 'User deleted successfully');
    } catch (error) {
      return ResponseHandler.error(res, error.message);
    }
  }
}

module.exports = UserController; 