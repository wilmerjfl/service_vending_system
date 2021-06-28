import { Request, Response } from 'express'

export const getVendings = (req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)

  if (!id) {
    res.status(404).json({
      success: false,
      message: `Please enter a valid id`
    })
  } else {
    res.status(200).json({
      success: true,
      message: `${id}`
    })
  }
}