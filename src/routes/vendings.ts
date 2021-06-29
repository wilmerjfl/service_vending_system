import { Router } from 'express'

import {
  getOneVending,
  postVendings,
  getVendings,
  putVending,
  deleteVending
} from '../controllers/vendings'

const router = Router()

router.route('/:id')
  .get(getOneVending)
  .put(putVending)
  .delete(deleteVending)

router.route('/')
  .post(postVendings)
  .get(getVendings)

export default router