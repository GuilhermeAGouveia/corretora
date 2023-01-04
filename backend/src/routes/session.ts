import { Router } from "express"
import SessionController from "../controllers/SessionController"

const router = Router()

router.post("/auth/login", SessionController.login)
router.post("/auth/user/token/", SessionController.getUserByToken)

export default router