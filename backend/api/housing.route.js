import express from "express"

const router = express.Router()

router.route("/").get((req, res) => res.send("hello world"))
// every route will start with this /api/v1/housing
// then will add the / behind for the API routing

export default router