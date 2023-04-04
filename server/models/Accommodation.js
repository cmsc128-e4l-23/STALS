//Barrientos, John Paul
import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  accommodationID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  landmarks: [String],
  address: {
    postCode: String,
    street: String,
    barangay: String,
    city: String,
    province: {
      type: String,
      required: true,
      default: 'Laguna'
    },
    region: {
      type: String,
      required: true,
      default: 'CALABARZON'
    }
  },
  generalLocation: {
    type: Number,
    required: false
  },
  accommodationType: {
    type: String,
    required: true,
    enum: ['Transient', 'Dorm', 'Rent']
  },
  amenities: {
    type: String,
    required: false
  },
  priceRange: {
    type: {
      minPrice: {
        type: Number,
        required: true
      },
      maxPrice: {
        type: Number,
        required: true
      }
    },
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photos: [String],
  restrictions: {
    curfew: {
      type: String,
      required: true
    },
    pets: {
      type: String,
      required: true,
      enum: ['Allowed', 'Not Allowed']
    },
    cooking: {
      type: String,
      required: true,
      enum: ['Allowed', 'Not Allowed', 'Depends (Owner’s Prerogative)']
    },
    visitors: {
      type: String,
      required: true,
      enum: ['Allowed', 'Not Allowed', 'Upon Approval']
    },
    coedStatus: {
      type: String,
      required: true,
      enum: ['Yes', 'No']
    },
    wifi: {
      type: String,
      required: true,
      enum: ['With WiFi', 'None', 'Add your own connection']
    },
    phoneSignal: {
      type: String,
      required: false,
      enum: ['Strong', 'Fair', 'Poor']
    }
  },
  security: {
    type: String,
    required: false
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
export default Accommodation;