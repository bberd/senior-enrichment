const express = require("express");
const router = new express.Router();
const models = require("../db/models");
const Student = models.Student;
const Campus = models.Campus;

module.exports = router;

router.param("studentId", (req, res, next, id) => {
  Student.findById(id)
    .then(student => {
      req.student = student;
      next();
      return null;
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
  if (req.query.campusId) {
    Student.findAll({
      where: {
        campusId: req.query.campusId
      }
    })
      .then(students => {
        res.json(students);
      })
      .catch(next);
  } else {
    Student.findAll({
      include: {
        model: Campus,
        as: "campus"
      }
    })
      .then(students => {
        res.json(students);
      })
      .catch(next);
  }
});

router.get("/:studentId", (req, res, next) => {
  Student.findOne({
    where: {
      id: req.params.studentId
    },
    include: {
        model: Campus,
        as: "campus"
      }
  })
  .then(student => {
    console.log(student)
    res.json(student);
    });
});

router.post("/", (req, res, next) => {
  Student.create(req.body)
    .then(newStudent => {
      return newStudent.setCampus(req.body.campusId);
    })
    .then(newStudent => {
      res.status(201).json(newStudent);
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(409).send("Student with that email already exists");
      } else {
        return next(err);
      }
    });
});

router.put("/:studentId", (req, res, next) => {
  req.student
    .update(req.body)
    .then(updatedStudent => {
      res.status(200).json(updatedStudent);
    })
    .catch(next);
});

router.delete("/:studentId", (req, res, next) => {
  req.student
    .destroy()
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});
