const express = require("express");
const router = new express.Router();
const models = require("../db/models");
const Campus = models.Campus;
module.exports = router;

router.param("campusId", (req, res, next, id) => {
  Campus.findById(id)
    .then(campus => {
      req.campus = campus;
      next();
      return null;
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
  Campus.findAll({})
    .then(campuses => {
      res.json(campuses);
    })
    .catch(next);
});

router.get("/:campusId", (req, res, next) => {
  res.json(req.campus);
});

router.post("/", (req, res, next) => {
  Campus.create(req.body)
    .then(newCampus => {
      res.status(201).json(newCampus);
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send('Campus already exists')
      } else {
        return next(err)
    }
  });
});

router.put("/:campusId", (req, res, next) => {
  req.campus
    .update(req.body)
    .then(updatedCampus => {
      res.status(200).json(updatedCampus);
    })
    .catch(next);
});

router.delete("/:campusId", (req, res, next) => {
  req.campus
    .destroy()
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});
