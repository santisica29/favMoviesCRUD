const { error } = require('console')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'favMovies1'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`);
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('favMovies').find().sort({rank: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {movies: data})
    })
    .catch(err => console.error(err))
})

app.post('/addMovie', (req, res) => {
    db.collection('favMovies').insertOne({
        name: req.body.movieName, 
        rank: Number(req.body.movieRank)
    })
    .then(result => {
        console.log('Movie Added');
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

app.put('/upvoteMovie', (req, res) => {
    db.collection('favMovies').updateOne({
        name: req.body.movieNameFromJS,
        rank: req.body.rankingFromJS
    },{
        $set: {
            rank: req.body.rankingFromJS + 0.1
        }
    }, {
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('upvoted Movie');
        res.json('upvote added')
    })
    .catch(err => console.error(err))
})

app.put('/downvoteMovie', (req, res) => {
    db.collection('favMovies').updateOne({
        name: req.body.movieNameFromJS,
        rank: req.body.rankingFromJS
    },{
        $set: {
            rank: req.body.rankingFromJS - 0.1
        }
    }, {
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('downvoted Movie');
        res.json('downvote added')
    })
    .catch(err => console.error(err))
})

app.delete('/deleteMovie', (req, res) => {
    db.collection('favMovies').deleteOne({
        name: req.body.movieNameFromJS
    })
    .then(result => {
        console.log('Movie Deleted');
        res.json('Movie Deleted')
    })
    .catch(err => console.error(err))
})

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})
