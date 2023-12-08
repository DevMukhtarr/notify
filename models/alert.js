import mongoose from "mongoose";
const Schema = mongoose.Schema;

const alert = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    },
    current_location:{
        type: String,
        default: null
    }
})

export default mongoose.model("Alert", alert)