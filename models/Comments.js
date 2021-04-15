function Comment(Id, content, count) {       
    this.Id = Id || null;
    this.content = content  || null;
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



module.exports = Comment;     // Export the Comment function as it is