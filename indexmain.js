const express = require("express");
const { connectDatabase } = require("./connection/connect");
const app = express();
const Job_Model = require("./models/Jobs");
const registration_Model = require("./models/Registrations");
app.use(express.json());
//// Posting Jobs By TnP
app.post("/api/jobdetails", async (req, res) => {
  try {
    let count = await Job_Model.find({
      CompanyName: req.body.comp_name,
    }).countDocuments();
    if (count < 2) {
      const newObject = {
        CompanyName: req.body.comp_name,
        JobRole: req.body.role,
        JobLocation: req.body.job_location,
        Salary: req.body.salary,
        noOfVacancy: req.body.vaccancy,
        branchEligibility: req.body.eligibility,
        minimumCGPA: req.body.min_cgpa,
        LastDate: req.body.last_date,
      };
      const jobdata = new Job_Model(newObject);
      await jobdata.save();
      return res.json({
        success: true,
        message: "JOB DESCRIPTION SAVED SUCCESSFULLY",
      });
    } else {
      return res.json({
        success: false,
        message: "This Company has already offered two jobs",
      });
    }
  } catch (error) {
    // return res.json({ success: true, data: count });
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});
///Student Registering for job applictaion
app.post("/api/StudentRegistration", async (req, res) => {
  try {
    let count = await registration_Model
      .find({ Job_ID: req.body.job_id, email_ID: req.body.email })
      .countDocuments();
    if (count < 1) {
      const newObject = {
        student_Name: req.body.stud_name,
        Job_ID: req.body.job_id,
        Branch: req.body.branch,
        CGPA: req.body.cgpa,
        passoutYear: req.body.passout_Year,
        email_ID: req.body.email,
        phone_Number: req.body.mobile_no,
        Home_Address: req.body.address,
        Job_Status: req.body.job_status,
        DateOfJobApplication: req.body.application_date,
      };
      const registerData = new registration_Model(newObject);
      await registerData.save();
      return res.json({
        success: true,
        message: "Student Applied Successfully",
      });
    } else {
      return res.json({ message: "Already Applied" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});

//TnP changing Job Status
app.put("/api/updating_Job_status/:id", async (req, res) => {
  try {
    const upd_data = await registration_Model.findByIdAndUpdate(req.params.id, {
      Job_Status: "Shortlisted",
    });
    return res.json({ success: true, data: upd_data });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});

//TnP changing Job details
app.put("api/updating_job_details/:id", async (req, res) => {
  try {
    const upd_data = await Job_Model.findByIdAndUpdate(req.params.id, {
      JobRole: "Manager",
      noOfVacancy: 54,
    });
    return res.json({ success: true, data: upd_data });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error: error.message });
  }
});

//student Changing their registration details
app.put("api/updating_registered_details/:id", async (req, res) => {
  try {
    const upd_data = await registration_Model.findByIdAndUpdate(req.params.id, {
      CGPA: 9.2,
      phone_Number: 7396780243,
    });
    return res.json({ success: true, data: upd_data });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error: error.message });
  }
});

// student can view all job posting applied
app.post("/api/view_All_Job_postings/:email", async (req, res) => {
  try {
    const registerData = await registration_Model.find({
      email_ID: req.params.email,
    });
    return res.json({ success: true, data: registerData });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error: error.message });
  }
});
//TnP can see students applied to a job
app.post("/api/view_All_appliedStud_to/:Job_Id", async (req, res) => {
  try {
    const registerData = await registration_Model.find({
      Job_ID: req.params.Job_Id,
    });
    return res.json({ success: true, data: registerData });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error: error.message });
  }
});
// filtered Job Postings

// comparison operator
// $eq---matches values that are equal to a specified value
// $gt---->matches values that are greater than a specified value
// $gte---->matches values that are greater than or equal to specified value
// $in---->matches any of the value specified in an array
// $lt---->matches values that are greater than a specified value
// $lte---->matches values that are greater than or equal to specified value
// $ne---->matches all the values that sre not equal to a specified value
// $nin---->matches none of the values specified in an array

app.post("/api/filtered_Job_Postings/:cgpa/:branch", async (req, res) => {
  try {
    const gpa = parseFloat(req.params.cgpa);
    const filteredJobData = await Job_Model.find({
      minimumCGPA: { $lte: gpa },
      branchEligibility: { $in: req.params.branch },
    });
    return res.json({ success: true, data: filteredJobData });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error: error.message });
  }
});
// TnP can see all the hired students/shortlisted students
app.post("/api/filtered_Job_Status/:jobstatus", async (req, res) => {
  try {
    const filteredJobData = await registration_Model.find({
      Job_Status: req.params.jobstatus,
    });
    return res.json({ success: true, data: filteredJobData });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error: error.message });
  }
});

// TnP can see hired student for a company
app.post("/api/hiredcandidate/:job_id", async (req, res) => {
  try {
    const hired = await registration_Model.find({
      Job_Status: "Hired",
      Job_ID: req.params.job_id,
    });
    return res.json({ success: true, data: hired });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});
// TnP can delete any job posting
app.delete("/api/delete/jobpostings/:id", async (req, res) => {
  try {
    const del_jobposting = await Job_Model.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});

// Student can delete any job posting
app.delete("/api/delete/registrationdetails/:id", async (req, res) => {
  try {
    const del_jobposting = await registration_Model.findByIdAndDelete(
      req.params.id
    );
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});

connectDatabase();
const PORT = 11000;
app.listen(PORT, async () => {
  await console.log(`Server is running at Port ${PORT}`);
});
