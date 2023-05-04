const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema(
  {
    student_Name: String,
    Job_ID: Number,
    Branch: String,
    CGPA: Number,
    passoutYear: Number,
    email_ID: String,
    phone_Number: Number,
    Home_Address: String,
    Job_Status: String,
    DateOfJobApplication: String,
  },
  { timestamps: true }
);

const registration_Model = mongoose.model(
  "Registration_Details",
  registerSchema
);
module.exports = registration_Model;

// Student name, JobID, Branch, CGPA, passoutYear, emailID, phonenumber,
//  Home Address, Job Status (Applied or shortlisted or Hired),
//   Job application date.
