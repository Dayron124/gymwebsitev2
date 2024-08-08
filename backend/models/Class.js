import mongoose from 'mongoose';

const classSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const Class = mongoose.model('Class', classSchema);

export default Class;
