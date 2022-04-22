import { Router } from "express"
import SessionController from "../controller/SessionController"

const router = Router()

router.post("/auth/login", SessionController.login)
router.post("/auth/user/token/", SessionController.getUserByToken)

export default router