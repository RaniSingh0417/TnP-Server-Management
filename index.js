const express = require("express");
const { connectDatabase } = require("./connection/connect");
const app = express();
const Job_Model = require("./models/Jobs");
const registration_Model = require("./models/Registrations");

app.use(express.json());

///trying  ---------

// app.post("/api/jobdetails", async (req, res) => {
//   try {
//     let count = await Job_Model.find({
//       CompanyName: req.body.comp_name,
//     }).countDocuments();
//     // return res.json({ success: true, data: jobdet });
//     // let job = jobdet.find((a) => {
//     //   if (a.CompanyName === req.params.comp_name) {
//     //     counter++;
//     //     return counter;
//     //   } else {
//     //     return counter;
//     //   }
//     // });
//     console.log(count);
//     // for (let cand of jobdet) {
//     //   if (cand.CompanyName === req.body.comp_name) {
//     //     counter = counter + 1;
//     //   }
//     //   console.log(counter);
//     if (count < 2) {
//       const newObject = {
//         CompanyName: req.body.comp_name,
//         JobRole: req.body.role,
//         JobLocation: req.body.job_location,
//         Salary: req.body.salary,
//         noOfVacancy: req.body.vaccancy,
//         branchEligibility: req.body.eligibility,
//         minimumCGPA: req.body.min_cgpa,
//         LastDate: req.body.last_date,
//       };
//       const jobdata = new Job_Model(newObject);
//       await jobdata.save();
//       return res.json({
//         success: true,
//         message: "JOB DESCRIPTION SAVED SUCCESSFULLY",
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: "This Company has already offered two jobs",
//       });
//     }
//   } catch (error) {
//     // return res.json({ success: true, data: count });
//     console.log(error);
//     return res.status(401).json({ success: false, error: error.message });
//   }
// });

// console.log(job);
//     console.log(counter);
//     // let counter = await Job_Model.countDocuments(req.body);
//     if (counter <= 2) {
//       const newObject = {
//         CompanyName: req.body.comp_name,
//         JobRole: req.body.role,
//         JobLocation: req.body.job_location,
//         Salary: req.body.salary,
//         noOfVacancy: req.body.vaccancy,
//         branchEligibility: req.body.eligibility,
//         minimumCGPA: req.body.min_cgpa,
//         LastDate: req.body.last_date,
//       };
//       const jobdata = new Job_Model(newObject);
//       await jobdata.save();
//       return res.json({
//         success: true,
//         message: "JOB DESCRIPTION SAVED SUCCESSFULLY",
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: "This Company has already offered two jobs",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ success: false, error: error.message });
//   }
// });

// app.post("/api/jobinfo", async (req, res) => {
//   try {
//     const { Company_Name } = req.body;
//     const count = await Job_Model.countDocuments({ Company_Name });
//     if (count >= 2) {
//       return res.status(400).json({ message: "Already Posted Two" });
//     }
//     const jobobj = {
//       // Job_Id: req.body.job_id,
//       // Company_Name: req.body.Company_Name,
//       // Job_Role: req.body.job_role,
//       // Job_location: req.body.job_location,
//       // Salary: req.body.salary,
//       // No_Of_vacancy: req.body.no_of_vacancy,
//       // Branch_Eligibility: req.body.branch_eligibility,
//       // Minimum_CGPA_required: req.body.Minimum_CGPA_required,
//       // Deadline_Date_For_Registration: req.body.deadline_date_for_registration,
//       CompanyName: req.body.comp_name,
//       JobRole: req.body.role,
//       JobLocation: req.body.job_location,
//       Salary: req.body.salary,
//       noOfVacancy: req.body.vaccancy,
//       branchEligibility: req.body.eligibility,
//       minimumCGPA: req.body.min_cgpa,
//       LastDate: req.body.last_date,
//     };
//     console.log(jobobj);
//     await new Job_Model(jobobj).save();
//     return res
//       .status(400)
//       .json({ success: true, message: "Database Connected" });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ success: false, error: error.message });
//   }
// });

// app.post("/getingdata/:branch", (req, res) => {
//   try {

//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, error: error.message });
//   }
// });

// app.get("/studentdata/:cgpa/:branch", (req, res) => {
//   try {
//     let userid = parseInt(req.params.cgpa);
//     console.log(userid);
//     let branch = req.params.branch;
//     console.log(branch);
//     let student = [
//       { cgpa: 9.8, name: "rani", batch: 23, state: "up", branch: "ece" },
//       { cgpa: 7, name: "anjali", batch: 23, state: "up", branch: "ece" },
//       { cgpa: 7.1, name: "aastha", batch: 23, state: "ap", branch: "me" },
//       { cgpa: 8.2, name: "aastha", batch: 23, state: "ap", branch: "me" },
//       { cgpa: 6.3, name: "aastha", batch: 23, state: "ap", branch: "me" },
//       { cgpa: 7.9, name: "anjali", batch: 23, state: "mp", branch: "ce" },
//       { cgpa: 8.0, name: "anjali", batch: 23, state: "mp", branch: "ce" },
//       { cgpa: 8.3, name: "anjali", batch: 23, state: "mp", branch: "ce" },
//       {
//         cgpa: 9.1,
//         name: "princi",
//         batch: 23,
//         state: "tamil nadu",
//         branch: "ee",
//       },
//     ];
//     const user = student.find((a) => {
//       // console.log(a);
//       return a.cgpa <= userid && a.branch === branch;
//     });
//     console.log(user);
//     if (user) {
//       return res.json({ message: user, success: true });
//     } else {
//       return res.json({ message: "not found", success: false });
//     }
//   } catch (error) {
//     return res.status(400).json({ success: false, error: error.message });
//   }
// });

// app.post("/api/stud", async (req, res) => {
//   try {
//     const { Job_ID, email_ID } = req.body;
//     const count = await REGISTRATION_MODEL.countDocuments({ Job_ID, email_ID });
//     if (count > 0) {
//       return res.status(400).json({ message: "Applied" });
//     }
//     const stuobj = {
//       Applicant_name: req.body.Student_name,
//       Job_Id: req.body.Job_Id,
//       Branch: req.body.Branch,
//       CGPA: req.body.CGPA,
//       Year_Of_Graduation: req.body.Passout_Year,
//       Contact_No: req.body.Student_contact_no,
//       Email_id: req.body.Email_Id,
//       Home_Address: req.body.Address,
//       Job_Status: req.body.Job_status,
//       Job_Application_Date: req.body.Job_application_date,
//     };
//     console.log(stuobj);
//     await new REGISTRATION_MODEL(stuobj).save();
//     return res
//       .status(400)
//       .json({ success: true, message: "Database Connected" });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ success: false, error: error.message });
//   }
// });

// app.post("/api/checking/:branch", async (req, res) => {
//   try {
//     // console.log(Job_Model.find().branchEligibility);
//     const check = await Job_Model.find(
//       branchEligibility.includes(req.params.branch)
//     );
//     return res.json({ success: true, data: check });
//   } catch (error) {
//     console.log(error);
//     return res.status(403).json({ success: false, error: error.message });
//   }
// });
// app.get("/api/filtered_Job_Postings/", async (req, res) => {
//   try {
// if ("cgpa" in req.params) {
//   const filteredRecords = Job_Model.where(
//     "minimumCGPA" + "<=" + "req.query.cgpa"
//   );
//           const filteredJobData = await Job_Model.find({
//             minimumCGPA: req.params.cgpa,
//             branchEligibility[i]: req.params.branch,
//           });
//       return res.json({ success: true, data: filteredRecords });

//   } catch (error) {
//     console.log(error);
//     return res.status(403).json({ success: false, error: error.message });
//   }
// });

// $eq---matches values that are equal to a specified value
// $gt---->matches values that are greater than a specified value
// $gte---->matches values that are greater than or equal to specified value
// $in---->matches any of the value specified in an array
// $lt---->matches values that are greater than a specified value
// $lte---->matches values that are greater than or equal to specified value
// $ne---->matches all the values that sre not equal to a specified value
// $nin---->matches none of the values specified in an array

connectDatabase();
const PORT = 10000;
app.listen(PORT, async () => {
  await console.log(`Server is running at Port ${PORT}`);
});
