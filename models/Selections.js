function Selection(Id, content, count) {       
    this.Id = Id || null;
    this.content = content  || null;
    this.count = count  || null;
}

Selection.prototype.getId = function() {
    return this.Id;
}

Selection.prototype.setId = function(Id) {
    this.Id = Id;
}

Selection.prototype.getContent = function() {
    return this.content;
}

Selection.prototype.setContent = function(content) {
    this.content = content;
}

Selection.prototype.getCount = function() {
    return this.count;
}

Selection.prototype.setCount = function(count) {
    this.count = count;
}


module.exports = Selection;     // Export the Selection function as it is