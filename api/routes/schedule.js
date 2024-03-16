const express = require("express")
const router = express.Router()
const {getAllSchedule,
    getScheduleById,
    UpdateSchedule,
    DeleteSchedule,
    AddSchedule} = require("../controllers/schedule")

router
    .get("/", getAllSchedule)
    .post("/", AddSchedule)
    .get("/:id", getScheduleById)
    .patch("/:id", UpdateSchedule)
    .delete("/:id", DeleteSchedule)

module.exports = router