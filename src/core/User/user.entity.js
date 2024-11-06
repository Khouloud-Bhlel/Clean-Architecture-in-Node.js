class User {
  constructor({ id, email, name, password, role = 'user', createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validate() {
    if (!this.email) throw new Error('Email is required');
    if (!this.password) throw new Error('Password is required');
    if (!this.name) throw new Error('Name is required');
  }
}

module.exports = User; 