const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()

//-- Initlization database path
require("../db/conncetionDB")

//-- schemaType Define in Database
const UserRegistration = require("../model/schemaType")

router.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return resp.status(400).json({
        error: "Invalid Creadientials",
      })
    }

    //-- Matching Email id from DataBase
    const userLogin = await UserRegistration.findOne({
      email: email,
    })

    if (userLogin) {
      //-- camparing password with hash
      const isMatch = await bcrypt.compare(password, userLogin.password)

      //:: --- Creating JsonWebToken Authentication ---
      const token = await userLogin.authTokenFunction();
      console.log(token);
      resp.cookie('jwt', token, {
        expires : new Date(Date.now() + 60000),
        httpOnly : true
      })


      if (!isMatch) {
        resp.status(400).json({
          error: "Login Faild Password Error",
        })
      } else {
        resp.json({
          message: "Login Successful",
        })
      }
    } else {
      resp.status(400).json({
        message: "Invalid Creadientials Email Incorrect",
      })
    }
  } catch {}
})

module.exports = router
