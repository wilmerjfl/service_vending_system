import { Schema, model } from 'mongoose'
import slugify from 'slugify'

const Vending: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxlength: [10, 'Name cannot be more then 10 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a valid category'],
    enum: [
      'Food',
      'Coffe',
      'IT',
      'Toys'
    ]
  },
  country: {
    type: String,
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

Vending.pre('save', async function(this: any, next): Promise<void> {
  this.name = slugify(
    `${this.country.slice(0, 1)}-${this.category[0]}-${this.name}`,
    {
      lower: true,
      replacement: '-',
      strict: true
    })
  next()
})

export const VendingModel = model('Vending', Vending)