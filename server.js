import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Yenza Backend is running'))

app.listen(2000, () => console.log('Server running on port 2000'))
