const fs = require('fs') //fs = file system 
const data = require('../data.json')
const { date } = require('../utils')



//index - Listagem de membros tabela

exports.index = function(req, res) {
  return res.render("members/index", { members: data.members })
}


// Apresentar dados dos instrutores em tela. -- Show

exports.show = function(req, res) {
  
  const { id } = req.params // desestruturação dos paramentros dos membros. Retirando só o id.

  const foundMember = data.members.find(function(member) {
    return member.id == id
  })

  if (!foundMember) return res.send('Member not found!')


  // organizando os dados para apresentação na página show.
  const member = { 
    ...foundMember,
    birth: date(foundMember.birth).birthDay

  }

  return res.render('members/show', { member })
}


// Create

exports.create = function(req, res) {
  return res.render('members/create')
}

// Post

exports.post = function(req, res) { // estrutura de validação no back end antes de mandar para o banco de dados
  const keys = Object.keys(req.body)             // recebendo dados do front end com o req.body 

  for(key of keys) {
    if (req.body[key] == "") {

      return res.send("Preencha todos os campos!")

    }
  }
  
  birth = Date.parse(req.body.birth) //  Tratamento e estruturando dados de instrutores

  let id = 1 
  const lastMember = data.members[data.members.length - 1] // evitando repetições de id com essa lógica. Apenas para o primeiro cadastro feito dentro da tabela de members.
                                                          // lógica de criação de id evitando conflito
  if (lastMember) {
    id = lastMember.id + 1
  }
  
  data.members.push({ //Dados que estou enviando
    id,
    ...req.body,
    birth
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ //amarzenando dados em arquivo local Json 
    if (err) return res.send("Write file error!")

    return res.redirect("/members")
  })
}


//edit

exports.edit = function(req, res) {
  
  const { id } = req.params // achando os dados do instrutor para edição

  const foundMember = data.members.find(function(member){
    return member.id == id 
  })

  if (!foundMember) return res.send('Member not found!')

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }

  return res.render('members/edit', { member })

}


// put - atualização de algum dado editado no instructor

exports.put = function(req, res) {

  const { id } = req.body
  let index = 0

  const foundMember = data.members.find(function(member, foundIndex) { // vai econtrar o instrutor e a posição do instrutor dentro do data

    if (member.id = id) {
      index = foundIndex
      return true
    }
  })

  if (!foundMember) return res.send("Member not found!")

  const member = { // comparação entre os dados existentes no data e os modificados no corpo da requisição
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = member // vai atualizar o banco de dados na posição que ele foi encontrado com os dados do instructor atualizado.

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write error!")

    return res.redirect(`/members/${id}`)
  })

}


// Delete

exports.delete = function(req, res) {
  const {id} = req.body

  const filteredMembers = data.members.filter(function(member){
    return member.id != id
  })

  data.members = filteredMembers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if (err) return res.send("Write file error!")
    
    return res.redirect("/members")
  })
}

