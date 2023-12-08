import mongoose from "mongoose";
const Schema = mongoose.Schema;

const alert = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    },
    first_name: {
        type: String, 
        default:null
    },
    current_house_address: {
        type: String, 
        default:null
    },
    second_house_address: {
        type: String, 
        default:null
    },
    phone_number: {
        type: String, 
        default:null
    },
    relationship_status: {
        type: String, 
        default:null
    },
    occupation: {
        type: String, 
        default:null
    },
    PII: {
        type: String, 
        default:null
    }
})

export default mongoose.model("Alert", alert)