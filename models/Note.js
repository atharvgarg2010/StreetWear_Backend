const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    gender:{
        type: String,
        default: "Unisex"
        
    },
    date:{
        type: Date,
        default: Date.now
    },
    image:{
        type: String,
    },
    price:{
        type:Number,
        default:200
    },
    S:{
        type:Boolean,
        default:false,
        // required:true
    },
    M:{
        type:Boolean,
        default:false,
        // required:true
    },
    L:{
        type:Boolean,
        default:false,
        // required:true
    },
    XL:{
        type:Boolean,
        default:false,
        // required:true
    },
    XXL:{
        type:Boolean,
        default:false,
        // required:true
    },
    XXXL:{
        type:Boolean,
        default:false,
        // required:true
    },size:{
        type : String
    }
  });

  module.exports = mongoose.model('notes', NotesSchema);