//Barrientos, John Paul
import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
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
      default: 'Laguna'
    },
    region: {
      type: String,
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
    enum: ['Transient', 'Dorm', 'Apartment', 'House for rent']
  },
  amenities: [String],
  restrictions: [String],
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
    }
  },
  description: {
    type: String,
    required: true
  },
  photos: [String],
  archived: {
    type: Boolean,
    default: false
  },
  approved: {
    type: Boolean,
    default: false
  },
  reviews: [{type: mongoose.Schema.Types.ObjectID, ref:"Review"}]
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
export default Accommodation;