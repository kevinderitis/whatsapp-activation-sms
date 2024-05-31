import mongoose from 'mongoose';

const numbersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    orderId: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

const Number = mongoose.model('Numbers', numbersSchema);

export default Number;
