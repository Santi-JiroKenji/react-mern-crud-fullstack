const express = require("express");
const router = express.Router();
const students = require("../models/studentSchema");

//REGISTER
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, studentID, level, age, email, mobile, desc } = req.body;

  if (!name || !studentID || !level || !age || !email || !mobile || !desc) {
    res.status(200).json("please fill the data");
  }

  try {
    const preStudent = await students.findOne({
      email: email,
    });
    console.log(preStudent);

    if (preStudent) {
      res.status(200).json("this is student is already");
    } else {
      const addStudent = new students({
        name,
        studentID,
        level,
        age,
        email,
        mobile,
        desc,
      });

      await addStudent.save();
      res.status(400).json(addStudent);
      console.log(addStudent);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET STUDENTS DATA
router.get("/getData", async (req, res) => {
  try {
    const studentData = await students.find();
    res.status(400).json(studentData);
    console.log(studentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET STUDENT
router.get("/getStudent/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const studentIndividual = await students.findById({
      _id: id,
    });
    console.log(studentIndividual);
    res.status(400).json(studentIndividual);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE STUDENT DATA
router.patch("/updateStudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateStudent = await students.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateStudent);
    res.status(400).json(updateStudent);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE STUDENT
router.delete("/deleteStudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStudent = await students.findByIdAndDelete({
      _id: id,
    });
    console.log(deleteStudent);
    res.status(400).json(deleteStudent);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
