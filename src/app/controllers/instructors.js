const fs = require('fs') //fs = file system 
const data = require('../data.json')
const { age, date } = require('../utils')




//index - Listagem de instrutores

exports.index = function(req, res) {
  return res.render("instructors/index", { instructors: data.instructors })
}


// Apresentar dados dos instrutores em tela. -- Show

exports.show = function(req, res) {
  const { id } = req.params // desestruturação dos paramentros dos instrutores. Retirando só o id.

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if (!foundInstructor) return res.send('Instructor not found!')


  // organizando os dados para apresentação na página show.
  const instructor = { 
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","), //Transformando strings do banco de dados em arrays
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at), // formatação para "desde" 
  }

  return res.render('instructors/show', {instructor})
}


// Create

exports.create = function(req, res) {
  return res.render('instructors/create')
}


// Post 

exports.post = function(req, res) { // estrutura de validação no back end antes de mandar para o banco de dados
  const keys = Object.keys(req.body)             // recebendo dados do front end com o req.body 

  for(key of keys) {
    if (req.body[key] == "") {

      return res.send("Preencha todos os campos!")

    }
  }

  let { avatar_url, birth, name, services, gender } = req.body //organização dos dados que quero enviar.

  
  birth = Date.parse(birth) //  Tratamento e estruturando dados de instrutores
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)


  data.instructors.push({ //Dados que estou enviando
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  })


  // configuração banco de dados

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ //amarzenando dados em arquivo local Json 
    if (err) return res.send("Write file error!")

    return res.redirect("/instructors")
  })
}


//edit

exports.edit = function(req, res) {
  
  const { id } = req.params // achando os dados do instrutor para edição

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id 
  })

  if (!foundInstructor) return res.send('Instructor not found!')

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso
  }

  return res.render('instructors/edit', { instructor })

}


// put - atualização de algum dado editado no instructor

exports.put = function(req, res) {

  const { id } = req.body
  let index = 0

  const foundInstructor = data.instructors.find(function(instructor, foundIndex) { // vai econtrar o instrutor e a posição do instrutor dentro do data

    if (instructor.id = id) {
      index = foundIndex
      return true
    }
  })

  if (!foundInstructor) return res.send("Instructor not found!")

  const instructor = { // comparação entre os dados existentes no data e os modificados no corpo da requisição
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.instructors[index] = instructor // vai atualizar o banco de dados na posição que ele foi encontrado com os dados do instructor atualizado.

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write error!")

    return res.redirect(`/instructors/${id}`)
  })

}


// Delete

exports.delete = function(req, res) {
  const {id} = req.body

  const filteredInstructors = data.instructors.filter(function(instructor){
    return instructor.id != id
  })

  data.instructors = filteredInstructors

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if (err) return res.send("Write file error!")
    
    return res.redirect("/instructors")
  })
}

