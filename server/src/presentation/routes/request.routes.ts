import { Router } from "express";
import { createBusinessRequestController } from "@/container/request.container";
import { getRequestsByClientIdController } from "@/container/request.container";
import { getByIdController } from "@/container/request.container";

import { authenticateMiddleware } from '@/container/auth.container'
import { authorize } from '@/presentation/middleware/authorization.middleware'
import { uploadPdf } from '@/presentation/middleware/upload.middleware'

const requestRouter = Router();

requestRouter.post("/", authenticateMiddleware, authorize('client'), uploadPdf.array('documents'), createBusinessRequestController.handle.bind(createBusinessRequestController));

requestRouter.get("/client/:clientId", authenticateMiddleware, authorize('client', 'admin', 'staff'), getRequestsByClientIdController.handle.bind(getRequestsByClientIdController));

requestRouter.get("/:id", authenticateMiddleware, authorize('client', 'admin', 'staff'), getByIdController.handle.bind(getByIdController));

export default requestRouter;