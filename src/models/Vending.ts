import { Schema, model } from 'mongoose'

const Vending: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [10, 'Name cannot be more then 10 characters']
  },
  category: {
    type: [String],
    required: [true, 'Please add a valid category'],
    enum: [
      'Food',
      'Coffe',
      'IT',
      'Toys'
    ]
  },
  country: {
    type: [String],
    required: [true, 'Please add a valid country'],
    enum: [
      'Argentina',
      'Uruguay'
    ]
  },
  location: {
    type: String,
    required: [true, 'Please add a valid location']
  }
})

export const VendingModel = model('Vending', Vending)