import express from "express"
import HousingCtrl from "./housing.controller.js"

const router = express.Router()

// router.route("/").get((req, res) => res.send("hello world"))
router.route("/").get(HousingCtrl.apiGetHousing)
router.route("/town").get(HousingCtrl.apiGetHousingTown)
// every route will start with this /api/v1/housing
// then will add the / behind for the API routing

export default router