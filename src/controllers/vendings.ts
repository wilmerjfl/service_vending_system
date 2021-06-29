import { Request, Response } from 'express'
import { VendingModel } from '../models/Vending'

export const getOneVending = async (req: Request, res: Response) => {
  const { id } = req.params
  const vending = await VendingModel.findById(id, {_id: 0, __v:0})

  if (vending) {
    res.status(200).json({
      success: true,
      message: vending
    })
  } else {
    res.status(404).json({
      success: false,
      message: `Vending with id: ${id} does not exist`
    })
  }
}

export const postVendings = async (req: Request, res: Response) => {
  
  const vending = await VendingModel.create(req.body)

  res.status(201).json({
    success: true,
    message: `A new Vending has been created with id: ${vending.id}`
  })
}

export const getVendings = async (req: Request, res: Response) => {
  const vending = await VendingModel.find()

  if (vending) {
    res.status(200).json({
      success: true,
      message: vending
    })
  } else {
    res.status(404).json({
      success: false,
      message: `Does not exist any Vending, please create a new one`
    })
  }
}

export const putVending = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body
  let vending = await VendingModel.findById(id)

  if (name) {
    res.status(400).json({
      success: false,
      message: `Vending name cannot be changed`
    })
  } else if (vending || vending != null) {
    await VendingModel.findOneAndUpdate({_id: id}, req.body, {
      runValidators: true,
    })
    vending = await VendingModel.findOne({ _id: id })
    
    res.status(201).json({
      success: true,
      message: vending
    })
  } else {
    res.status(404).json({
      success: false,
      message: `Vending with id: ${id} does not exist`
    })
  }
}

export const deleteVending = async (req: Request, res: Response) => {
  const { id } = req.params

  const vending = await VendingModel.findById(id)

  if (vending) {
    vending.remove()

    res.status(200).json({
      success: true,
      message: `The Vending with id:${id} has been deleted`
    })
  } else {
    res.status(404).json({
      success: false,
      message: `Vending with id: ${id} does not exist`
    })
  }
}