import express from 'express';

const router = express.Router();

router.get("/home", (req, res) =>{
    res.render('home')
})

router.get("/profile", (req, res) =>{
    res.render('profile')
})

export default router;