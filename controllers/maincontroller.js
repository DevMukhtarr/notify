import opencage from "opencage-api-client";
const apiKey = process.env.OPEN_CAGE_KEY;
import Alert from "../models/alert.js";
import mongoose from "mongoose";


export const sendDetailsToAdmin = async (req, res) => {
    const { latitude, longitude }  = req.body
    try {
        const user_id = req.user.id
    
        const data = await opencage.geocode({
             key: process.env.OPEN_CAGE_KEY,
             q: `${latitude}, ${longitude}`,
            language: 'en'
            })

            if (data.status.code === 200 && data.results.length > 0) {
                const place = data.results[0];
                const location = place.formatted;
                // const road = place.components.road;

                const new_alert = await Alert.create({
                    user_id,
                    current_location: location,
                })

                new_alert.save()

                return res.status(200).json({
                    status: true, 
                    message: 'Alert sent successfully'
                });

              } else {
                res.status(400).json({ 
                    message: 'Bad request'
                 });
              }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const viewAlerts = async(req, res) => {
    const userId = req.user.id
    const role = req.user.role;
    try {
        let alerts;
    
        if (role === 'admin') {
          // Fetch all alerts and populate user information
          alerts = await Alert.find().populate({
            path: 'user_id',
            select: 'email first_name last_name username first_house_address second_house_address previous_house_address current_house_address phone_number relationship_status gender occupation PII',
          });
        } else if (role === 'user') {
          // Fetch alerts for the specific user ID
          alerts = await Alert.find({ user_id: new mongoose.Types.ObjectId(userId) })
          .populate({
            path: 'user_id',
            select: 'email first_name last_name username first_house_address second_house_address previous_house_address current_house_address phone_number relationship_status gender occupation PII',
          })
          ;
        } else {
          // Handle other roles if needed
          return res.status(403).json({ message: 'Forbidden: Invalid role' });
        }
    
        res.status(200).json({ alerts });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}