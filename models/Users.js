function User(Id, name, email, password,token) {       
    this.Id = Id || null;
    this.name = name  || null;
    this.email = email  || null;
    this.password = password  || null;
    this.token = token || null;
}

User.prototype.getId = function() {
    return this.Id;
}

User.prototype.setId = function(Id) {
    this.Id = Id;
}

User.prototype.getName = function() {
    return this.name;
}

User.prototype.setName = function(name) {
    this.name = name;
}

User.prototype.getEmail = function() {
    return this.email;
}

User.prototype.setEmail = function(email) {
    this.email = email;
}

User.prototype.getPassword = function() {
    return this.password;
}

User.prototype.setPassword = function(password) {
    this.password = password;
}

User.prototype.setFirebaseToken = function(token){
    this.token = token;
}

User.prototype.getFirebaseToken = function(){
    return this.token; 
}

module.exports = User;     // Export the User function as it is