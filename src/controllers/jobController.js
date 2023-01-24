const Job = require("../models/jobModel");

const adminPostJob = async (req, res) => {
  const { company, position, location, contract } = req.body;
  try {
    const newJob = await Job.create({
      companyName: company,
      position,
      location,
      contract,
    });
    console.log("newJob:", newJob);

    res.status(201).json({ message: newJob, status: "New Job has been Added" });
  } catch (error) {
    console.log("Error at backend jobpost Route", error.message);
    res.status(500).json({ message: error.message });
  }
};

const adminEditJob = async (req, res) => {
  const { company, position, location, contract } = req.body;

  try {
    const newJob = await Job.create({
      companyName: company,
      position,
      location,
      contract,
    });

    res.status(201).json({ message: newJob, status: "New Job has been Added" });
  } catch (error) {
    console.log("Error at backend jobpost Route", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getJobList = async (req, res) => {
  try {
    const jobList = await Job.find();

    res.status(201).json({ jobsList: jobList });
  } catch (error) {
    console.log("Error at backend jobpost Route", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  console.log("req.params.id:", req.params.id);
  const jobList = await Job.findById(req.params.id);
  console.log('jobList:', jobList)

  if (jobList) {
    await jobList.remove();
    res.json({ message: "jobList Removed" });
  } else {
    res.status(400);

    throw new Error("jobList Not Found");
  }
};

module.exports = { adminPostJob, getJobList, deleteJob };
