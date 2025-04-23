import mongoose, { Schema } from "mongoose";

//Schema

const clientSchema = mongoose.Schema({
  lastname: { 
    type: String, 
    required: true 
  },
  firstname: { 
    type: String, 
    required: true
  },
  birthdate: { 
    type: Date, 
    required: true
  },
  company: { 
    type: String, 
    required: false
  },
  email: { 
    type: String, 
    required: true
  },
  address: { 
    type: String, 
    required: true
  },
  vat: {
    type: String, 
    required: function(){
      return this.company ? true: false;
    }
  },
  client_number: { type: Number, required: true},
  regitration_date: { type: Date, required: true},
  sectors: {type: String, enum: ['sector1', 'sector2', 'sector3'], required: true},
  revenues: {
    type: Number,
    min: 0,
    max: 1000000000,
    required: function() {
      return this.company ? true : false;
    }
  },
  user: {type: Object, required: true},

},
{
  statics: {
    getCompanyMembers: function() {
      return this.find({
        company: this.company,
        _id: { $ne: this._id }
      });
    }
  }
});

// Pre-save middleware
clientSchema.pre('save', function(next) {
  next();
  });
  
// Methode d'instance

  clientSchema.methods.getAge = function (){
    const today = new Date();
  const birthDate = new Date(this.birthdate);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  // Ajustement si l'anniversaire n'est pas encore passé cette année
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
  }

  export const Client= mongoose.model('Client', clientSchema);