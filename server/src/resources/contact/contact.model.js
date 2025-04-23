import mongoose, { Schema } from "mongoose";

const clientSchema = mongoose.Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

  export const Contact= mongoose.model('Contact', contactSchema);