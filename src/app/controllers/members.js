const { age, date } = require('../../lib/utils')


module.exports = {
  
  index(req, res) {

    return res.render("members/index")

  },
  
  show(req, res) {

   return

  },
  
  create(req, res) {

    return res.render('members/create')

  },
  
  post(req, res) {

    const keys = Object.keys(req.body)              

    for(key of keys) {
      if (req.body[key] == "") {

        return res.send("Preencha todos os campos!")

      }
    }

    return

  },
  
  edit(req, res) {

    return
  
  },
  
  put(req, res) {

    const keys = Object.keys(req.body)             // recebendo dados do front end com o req.body 

    for(key of keys) {
      if (req.body[key] == "") {

        return res.send("Preencha todos os campos!")

      }
    }

    return

  },
  
  delete(req, res) {

    return

  }
}
