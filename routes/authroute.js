import express from 'express';
import { signIn, signUp } from '../controllers/authcontroller.js';

const router = express.Router();

router.post("/", signIn)
router.get("/register", (req, res) =>{
    res.render('register')
})
router.post("/register", signUp)


export default router;