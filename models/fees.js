const mongoose = require('mongoose');

const FeesSchema = new mongoose.Schema({
  stuId: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true,
   
  },
 
  totalFees: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
   
  },
  remarks: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
 
},{timestamps:true});

const Fees = mongoose.model('Fees', FeesSchema);

module.exports = Fees;
