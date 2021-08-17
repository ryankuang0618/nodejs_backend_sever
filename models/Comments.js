function Comment(Id, content, time) {       
    this.Id = Id || null;
    this.content = content  || null;
    this.time = time || null;
}

Comment.prototype.getId = function() {
    return this.Id;
}

Comment.prototype.setId = function(Id) {
    this.Id = Id;
}

Comment.prototype.getContent = function() {
    return this.content;
}

Comment.prototype.setContent = function(content) {
    this.content = content;
}

Comment.prototype.getTime = function() {
    return this.time;
}

Comment.prototype.setTime = function(time) {
    this.time = time;
}



module.exports = Comment;     // Export the Comment function as it is