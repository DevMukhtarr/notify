import opencage from "opencage-api-client";
const apiKey = process.env.OPEN_CAGE_KEY;
import alert from "../models/alert.js";

export const sendDetailsToAdmin = async (req, res) => {
    const { latitude, longitude }  = req.body

    try {
        const data = await opencage.geocode({
             key: process.env.OPEN_CAGE_KEY,
             q: `${latitude}, ${longitude}`,
            language: 'en'
            })

            if (data.status.code === 200 && data.results.length > 0) {
                const place = data.results[0];
                const address = place.formatted;
                const road = place.components.road;

                console.log(address)
                const new_alert = await alert.create({

                })
              } else {
                res.status(400).json({ 
                    message: 'Bad request'
                 });
              }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}