const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    CompanyName: String,
    JobRole: String,
    JobLocation: String,
    Salary: Number,
    noOfVacancy: Number,
    branchEligibility: Array,
    minimumCGPA: Number,
    LastDate: String,
  },
  { timestamps: true }
);

const Job_Model = mongoose.model("job_details", jobSchema);
module.exports = Job_Model;
// Company Name, Job Role, Job Location, Salary,No of Vacancy,
// Branch Eligibility (i.e. which branch students can apply),
// Minimum CGPA required, Deadline Date for registration.
