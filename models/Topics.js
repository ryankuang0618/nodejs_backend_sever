function Topic(Id, title) {       
    this.Id = Id || null;
    this.title = title  || null;
}

Topic.prototype.getId = function() {
    return this.Id;
}

Topic.prototype.setId = function(Id) {
    this.Id = Id;
}

Topic.prototype.getTitle = function() {
    return this.title;
}

Topic.prototype.setTitle = function(title) {
    this.title = title;
}


module.exports = Topic;     // Export the Topic function as it is