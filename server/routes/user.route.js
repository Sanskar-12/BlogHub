import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import {deleteUser, getUsers, updateUser} from "../controllers/user.controller.js"

const router=express.Router()

router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,deleteUser)
router.get("/get/all/users",verifyToken,getUsers)

export default router