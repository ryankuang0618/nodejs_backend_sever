function Article(Id, title, content, time) {       
    this.Id = Id || null;
    this.title = title  || null;
    this.content = content  || null;
    this.time = time  || null;
}

Article.prototype.getId = function() {
    return this.Id;
}

Article.prototype.setId = function(Id) {
    this.Id = Id;
}

Article.prototype.getTitle = function() {
    return this.title;
}

Article.prototype.setTitle = function(title) {
    this.title = title;
}

Article.prototype.getContent = function() {
    return this.content;
}

Article.prototype.setContent = function(content) {
    this.content = content;
}

Article.prototype.getTime = function() {
    return this.time;
}

Article.prototype.setTime = function(time) {
    this.time = time;
}

// Article.prototype.equals = function(otherPost) {
//     return otherPost.getTitle() == this.getTitle()
//         && otherPost.getArticle() == this.getArticle()
//         && otherPost.getAuthor() == this.getAuthor();
// }

// Posts.prototype.fill = function(newFields) {
//     for (var field in newFields) {
//         if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
//             if (this[field] !== 'undefined') {
//                 this[field] = newFields[field];
//             }
//         }
//     }
// };

module.exports = Article;     // Export the Article function as it is