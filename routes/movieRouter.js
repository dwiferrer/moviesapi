const express = require("express");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const { connection: movies } = mongoose;
const movieRouter = express.Router();

// //SYNC
// app.use("/actors", (req, res) => {
//   movies.db
//   .collection("movieDetails")
//   .find({director: "Wes Anderson"})
//   .toArray()
//   .then(result =>{
//     res.json(result)
//   })
// });

// //MOVIE WITH CORRECT LINK (SYNC)
// movieRouter.get("/movies1", (req, res, next) => {
//   const size = 10; // results per page
//   const page = req.query.page // Page 
//   mongoose.connection.db
//   .collection("movieDetails")
//   .find({})
//   .sort({ year: -1 })
//   .skip((size * page) - size)
//   .limit(size)
//   .toArray()
//   .then((movies) => {
//   var newArray = new Array()
//   movies.forEach((arrayItem) => {
//       var poster = arrayItem.poster
//       var posterLink = poster.split("/")
//       var image = ("https://" + posterLink[2] + '/' + posterLink[3]+ '/' + posterLink[4] + '/' + posterLink[5])
//       var image = image
//       var movieDetails = {
//          title: arrayItem.title,
//          poster: image
//       }
//       newArray.push(movieDetails)
//     })
//     res.json(newArray);
// }, (err) => next(err))
// .catch((err) => next(err)); 
// });

//GET MOVIES with proper link
movieRouter.get("/movies", async(req,res,next) => {
  try {
    var page = parseInt(req.query.page)
    var size = parseInt(req.query.size)

    const movie =  await movies.db
     .collection("movieDetails")
     //.find({}, { projection: { _id: 0, title:1, year: 1, poster: 1 }})
     .find({})
     .sort( { year: -1 } ) 
     .skip((page * size) - size)
     .limit(size)
     .toArray();

    movie.forEach((item) => {
      if (item.poster!=null)
        item.poster = item.poster.replace("http", "https")
    })
    res.json(movie);
  } catch (err){
    console.log(err)
  }     
});

// HOME
movieRouter.get("/home", async(req,res,next) => { 
try {
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  const movie =  await movies.db
   .collection("movieDetails")
   //.find({}, { projection: { _id: 0, title:1, year: 1, poster: 1 }})
   .find({})
   .sort( { "tomato.rating": -1 } ) 
   .skip((page * size) - size)
   .limit(size)
   .toArray();

  movie.forEach((item) => {
    if (item.poster!=null)
      item.poster = item.poster.replace("http", "https")
  })
  res.json(movie);
} catch (err){
  console.log(err)
}     
});

// GET MOVIE ID
movieRouter.get("/movies/:id", async(req,res,next) => {
    try {
      const movie = await movies.db
      .collection("movieDetails")
      .findOne({ _id: new ObjectId(req.params.id) }) 
      //{ projection: { _id: 0, title:1, plot: 1, poster: 1 }})     
      if (movie.poster != null){
        movie.poster = movie.poster.replace("http", "https")
      }
      res.json(movie)
    } catch (err){
        console.log(err)
    } 
  });

// GET MOVIE ID COUNTRIES
movieRouter.get("/movies/:id/countries", async(req,res,next) => {
    try {
      const movie = await movies.db
      .collection("movieDetails")
      .findOne({ _id: new ObjectId(req.params.id) }, 
      { projection: { _id: 0, countries: 1 }})
      res.json(movie)
    } catch (err){
        console.log(err)
    } 
  }); 

// GET MOVIE ID WRITERS
movieRouter.get("/movies/:id/writers", async(req,res,next) => {
    try {
      const movie = await movies.db
      .collection("movieDetails")
      .findOne({ _id: new ObjectId(req.params.id) }, 
      { projection: { _id: 0, writers: 1 }})
      res.json(movie)
    } catch (err){
        console.log(err)
    } 
  }); 

// GET WRITERS
movieRouter.get("/writers", async(req,res,next) => {
    try {
      console.log(req.query.name)
      const movie = await movies.db
      .collection("movieDetails")
      .find({ writers: new RegExp(req.query.name, "i") }, 
      { projection: { _id: 0, title:1, writers: 1 }})
      .toArray()
      res.json(movie)
    } catch (err){
        console.log(err)
    } 
  });

 // UPDATE 
  movieRouter.get("/update/:id", async(req, res ,next) => {
    try {
      const movie = await movies.db
      .collection("movieDetails")
      .findOne({ _id: new ObjectId(req.params.id) })
      if (movie.poster != null){
        movie.poster = movie.poster.replace("http", "https")
      }
      res.json(movie)
    } catch (err){
        console.log(err)
    } 
  })
  .post("/update/:id", async(req, res ,next) => {
    try {
      console.log(req.body.title)
      const movie = await movies.db
      .collection("movieDetails")
      .findOneAndUpdate({ _id: new ObjectId(req.params.id) },
       {$set: {
        // TO EDIT
        title: req.body.title, 
        year: req.body.year
         }})
      res.json({update: "success"})
    } catch (err){
        console.log(err)
    } 
  });

//SEARCH
movieRouter.get("/search", async(req, res, next) => {
  if (req.query.all) {
    try {
      console.log(req.query.all)
      const movie = await movies.db
      .collection("movieDetails")
      .find({})
      .toArray()
      res.json(movie)
    } catch(err){
      console.log(err)
    }  
  } 
  else if (req.query.title){
    try {
      console.log(req.query.title)
      const movie = await movies.db
      .collection("movieDetails")
      .find({ title: new RegExp(req.query.title, "i") }, 
      { projection: { _id: 0, title:1, plot: 1 }})
      .toArray()
      res.json(movie)
    } catch(err){
      console.log(err)
    }  
  }
  else if (req.query.actors){
    try {
      console.log(req.query.actors)
      const movie = await movies.db
      .collection("movieDetails")
      .find({ actors: new RegExp(req.query.actors, "i") }, 
      { projection: { _id: 0, title:1, actors: 1 }})
      .toArray()
      res.json(movie)
    } catch(err){
      console.log(err)
    }  
  }
  else if (req.query.plot){
    try {
      console.log(req.query.plot)
      const movie = await movies.db
      .collection("movieDetails")
      .find({ plot: new RegExp(req.query.plot, "i") }, 
      { projection: { _id: 0, title:1, plot: 1 }})
      .toArray();
      res.json(movie)
    } catch(err){
      console.log(err)
    }  
  }
});     

//  //DELETE 
//   movieRouter.get("/delete/:id", async(req,res,next) => {
//     try {
//       const movie = await movies.db
//       .collection("movieDetails")
//       .findOneAndRemove({ _id: new ObjectId(req.params.id) })
//       res.json({
//         moviedeletion: success
//       })
//     } catch (err){
//         console.log(err)
//     } 
//   });

module.exports = movieRouter; 