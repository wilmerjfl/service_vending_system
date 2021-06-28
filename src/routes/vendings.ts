import { Router } from 'express'

import { getOneVending, postVendings } from '../controllers/vendings'

const router = Router()

router.route('/:id')
  .get(getOneVending)

router.route('/')
.post(postVendings)

export default router