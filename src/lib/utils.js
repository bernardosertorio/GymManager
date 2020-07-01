module.exports = { // transformando a data de aniversário que está em timestamp para o formato convencional

  age: function(timestamp) { 
    const today = new Date()
    const birthDate = new Date(timestamp)

    // calculo de idade por ano e mês.
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    today.getDate()
    birthDate.getDate()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1
    }

    return age
  },

  date: function(timestamp) { // formatando datas de acordo com o HTML
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDay()}`.slice(-2) 

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`, // retorno do tipo iso
      birthDay: `${day}/${month}`
    }
  }
}