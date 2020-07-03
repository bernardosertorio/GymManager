const express = require('express')
const routes = express.Router()
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')



routes.get('/', function(req, res) {
  return res.redirect("/instructors")
})


// Instructor's routes 

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.post("/instructors", instructors.post) 
routes.put("/instructors", instructors.put)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.delete("/instructors", instructors.delete)


// Member's routes

routes.get('/members',  members.index)
routes.get('/members/create', members.create)
routes.post("/members", members.post) 
routes.put("/members", members.put)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.delete("/members", members.delete)
routes.get('/members', function(req, res) {
  return res.send("members")

})

module.exports = routes