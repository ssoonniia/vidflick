const express = require('express')
const Joi = require('joi')

const app = express();

app.use(express.json())

const genres = [{id: 1, name: 'scary'}, {id:2, name: 'flick'}]

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))


app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
})

app.post('/api/genres', (req, res) => {
  const {error} = validateGenre(req.body)

  if(error) return res.status(400).send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }

  genres.push(genre)
  res.send(genre)
})

app.get('/api/genres/:id', (req, res) => {
  const genre = setGenre(req.params.id)

  if(!genre) return res.status(404).send('The genre with the give ID was not found')

  res.send(genre)
})


function validateGenre(course){
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(course, schema)
}

function setGenre(genreId){
  return genres.find( genre => genre.id === parseInt(genreId))
}
