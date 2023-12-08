import express from 'express';
import { sendDetailsToAdmin } from '../controllers/maincontroller.js';
import { verifyToken } from "../middlewares/auth.js"

const router = express.Router();

router.get("/home", (req, res) =>{
    res.render('home')
})

router.get("/profile", (req, res) =>{
    res.render('profile')
})

router.post("/send-details", verifyToken,sendDetailsToAdmin)

export default router;