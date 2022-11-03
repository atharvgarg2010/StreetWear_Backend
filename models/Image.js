const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    idd:{
        type: String,
        ref: 'user'
    },
    userId:{
        type: String,
        ref: 'userID'
    },
    desc:{
        type: String,
        required:true,
    },
  });

  module.exports = mongoose.model('Comment', CommentSchema);