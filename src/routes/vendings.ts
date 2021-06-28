import { Router } from 'express'

import { getVendings } from '../controllers/vendings'

const router = Router()

router.route('/:id')
  .get(getVendings)

export default router