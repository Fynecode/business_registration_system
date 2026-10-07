import { registerClientController } from '@/container/client.container'
import { loginClientController } from '@/container/client.container'
import { getCurrentUserController } from '@/container/client.container'
import { authenticateMiddleware } from '@/container/auth.container'
import { authorize } from '@/presentation/middleware/authorization.middleware'
import { updateClientController } from '@/container/client.container'
import { deleteClientController } from '@/container/client.container'
import { Router } from 'express'

const clientRoutes = Router()

clientRoutes.post(
    '/register',
    registerClientController.handle.bind(registerClientController)
)

clientRoutes.post(
    '/login',
    loginClientController.handle.bind(loginClientController)
)

clientRoutes.get(
    '/me',
    authenticateMiddleware,
    getCurrentUserController.handle.bind(
        getCurrentUserController
    )
)

clientRoutes.patch(
    '/:id',
    authenticateMiddleware,
    authorize('client'),
    updateClientController.handle.bind(updateClientController)
)

clientRoutes.delete(
    '/',
    authenticateMiddleware,
    authorize('client'),
    deleteClientController.handle.bind(deleteClientController)
)

export default clientRoutes