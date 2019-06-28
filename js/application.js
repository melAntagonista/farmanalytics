const Farm = require('../models/farms');
const mongoose = require("mongoose");

function malesFemalesPercentage() {
let maleQuantity = Farm.find({
    "gender": "F"});
//  console.log(Farm.find())
 console.log(maleQuantity)
 return maleQuantity;
}
malesFemalesPercentage()