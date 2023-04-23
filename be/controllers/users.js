//import stuff
const bcrypt = require('bcrypt') //for hashing passwords
const express = require('express')
const usersRouter = require('express').Router()
const User = require('../models/users');


usersRouter.post('/', async (request, response) => {
    console.log("here")
    console.log(request)
    const { email, firstName, lastName, password } = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      email,
      firstName,
        lastName,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  })
  
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { title: 1, location: 1, content: 1,  date_created: 1}) //populate notes 
    response.json(users)
})
module.exports = usersRouter