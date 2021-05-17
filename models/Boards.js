function Board(Name, description) {       
    this.Name = Name || null;
    this.description = description  || null;
}

Board.prototype.getName = function() {
    return this.Name;
}

Board.prototype.setName = function(Name) {
    this.Name = Name;
}

Board.prototype.getDescription = function() {
    return this.description;
}

Board.prototype.setDescription = function(description) {
    this.description = description;
}



module.exports = Board;     // Export the Comment function as it is