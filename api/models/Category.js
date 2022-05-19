const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({

  title: {
    type:String,
    required: true
  },
  textArt: {
    type:String,
    required: true
  },
  category: {
    type:String,
    required: true
  },
  imageSrc: {
    type: Object,
    default: null
  },
  user: {
    name: String,
    lastName: String,
    id: Schema.Types.ObjectId,
    imageSrc: {
      type: Object,
      default: null
    },
  },
  count: {
    type:Number,
    default: 0
  },
  data: {
    type:String,
    default: ''
  },
})

module.exports = mongoose.model('articles', categorySchema)
