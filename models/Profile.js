const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  sport: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  bio: {
    type: String
  },
  staff: [
    {
      nationality: {
        type: String
      },
      surname: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  detection: [
    {
      school: {
        type: String
      },
      name: {
        type: String,
        required: true
      },
      surname: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      description: {
        type: String
      },
      location: {
        type: String
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
