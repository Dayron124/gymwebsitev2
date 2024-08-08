import mongoose from 'mongoose';

const competitionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Competition = mongoose.model('Competition', competitionSchema);

export default Competition;
