import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const StationSchema = new schema({
    name:{
        type: String,
        required: true,
        minlength: 5
    },
    address:{
        type: String,
        required: true,
    
    },
    phone:{
        type: Number,
        match: /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
        required: true,
    },
    password:{
        type: String,
        required: true,
    
    },
    policeOfficers: [{ type: Schema.Types.ObjectId, ref: 'Officer' }]
 
});
StationSchema.virtual('officers', {
    ref: 'Officer',
    localField: '_id',
    foreignField: 'policeStation',
    justOne: false
  });


const PoliceStation = mongoose.model('Station',StationSchema);
export { PoliceStation};

