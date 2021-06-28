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

  res.status(200).json({
    success: true,
    message: `A new Vending has been created with id: ${vending.id}`
  })
}