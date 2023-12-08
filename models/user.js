import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
    email: {
        type: String, 
        default:null
    },
    first_name: {
        type: String, 
        default:null
    },
    last_name: {
        type: String, 
        default:null
    },
    username: {
        type: String, 
        default:null
    },
    password: {
        type: String, 
        default:null
    },
    first_house_address: {
        type: String, 
        default:null
    },
    second_house_address: {
        type: String, 
        default:null
    },
    previous_house_address: {
        type: String, 
        default:null
    },
    current_house_address: {
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
    gender: {
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
    },
})

export default mongoose.model("User", user)