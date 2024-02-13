const express = require("express")
const router = express.Router()

//-- Fetching Database for inserting value
require("../db/conncetionDB")
// routes 

//-- schemaType Define in Database
const UserRegistration = require("../model/schemaType")

router.get("/", (req, res) => {
  res.send("Hii ..... im router side ")
})

//:: -----Registration Code Here ----- :://
router.post("/signup", async (req, res) => {
  //-- Fetch value from user and destructred
  const { name, email, phone, work, password, confirmPassword } = req.body
  // console.log(name)

  //-- Check vlaue if empty
  // const value =
  if (!name || !email || !phone || !work || !password || !confirmPassword) {
    return res.status(422).json({
      error: "Fill all blanks",
    })
  }

  try {
    const userExist = await UserRegistration.findOne({ email: email })
    if (userExist) {
      return res.status(422).json({
        error: "Emain Already Exist",
      })
    } else if (password != confirmPassword) {
      return res.status(422).json({
        error: "Password not match",
      })
    } else {
      const newUser = new UserRegistration({
        name,
        email,
        phone,
        work,
        password,
        confirmPassword,
      })

      await newUser.save()
      res.status(201).json({
        message: "User Registered Successfully",
      })
    }
  } catch (error) {
    console.log("catch error", error)
  }
})

module.exports = router
