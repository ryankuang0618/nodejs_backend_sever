function Posts(title, article, author) {       
    this.title = title || null;
    this.article = article  || null;
    this.author = author  || null;
}

Posts.prototype.getTitle = function() {
    return this.title;
}

Posts.prototype.setTitle = function(title) {
    this.title = title;
}

Posts.prototype.getArticle = function() {
    return this.article;
}

Posts.prototype.setArticle = function(article) {
    this.article = article;
}

Posts.prototype.getAuthor = function() {
    return this.author;
}

Posts.prototype.setAuthor = function(author) {
    this.author = author;
}

Posts.prototype.equals = function(otherPost) {
    return otherPost.getTitle() == this.getTitle()
        && otherPost.getArticle() == this.getArticle()
        && otherPost.getAuthor() == this.getAuthor();
}

Posts.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

module.exports = Posts;     // Export the Posts function as it is