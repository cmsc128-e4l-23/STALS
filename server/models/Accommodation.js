//Barrientos, John Paul
import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
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
    type: [String],
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
    }
  },
  description: {
    type: String,
    required: true
  },
  photos: [String],
  restrictions: [String],
  security: {
    type: String,
    required: false
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  },
  reviews: [{type: mongoose.Schema.Types.ObjectID, ref:"Review"}]
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
export default Accommodation;