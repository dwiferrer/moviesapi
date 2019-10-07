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

// //GET MOVIES
// movieRouter.get("/movies", async(req,res,next) => {
//     try {
//       const movie = await movies.db
//       .collection("movieDetails")
//       .find({ actors: "Chris Pine"})
//       .toArray()
//       res.json(movie)
//     } catch (err){
//         console.log(err)
//     } 
//   });

// HOME
movieRouter.get("/home", async(req,res,next) => {
  try {
    var currentDate = new Date()
    var currentYear = currentDate.getFullYear() -1
    //TO EDIT
    console.log(currentYear)
    const movie = await movies.db
    .collection("movieDetails")
    .find({ year: currentYear }, 
    { projection: { _id: 0, title:1, plot: 1, poster: 1 }})
    .toArray()
    res.json(movie)
  } catch (err){
      console.log(err)
  } 
}); 

// GET MOVIE ID
movieRouter.get("/movies/:id", async(req,res,next) => {
    try {
      const movie = await movies.db
      .collection("movieDetails")
      .findOne({ _id: new ObjectId(req.params.id) }, 
      { projection: { _id: 0, title:1, plot: 1, poster: 1 }})
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
      .find({ writers: req.query.name }, 
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
  // if (req.query.title && req.query.actors && req.query.plot ){
  //   try {
  //     console.log(req.query.title)
  //     console.log(req.query.actors)
  //     console.log(req.query.plot)
  //     const movie = await movies.db
  //     .collection("movieDetails")
  //     .find({ title: new RegExp(req.query.title, "g") },
  //     // { actors: new RegExp(req.query.actors, "g") },
  //     // { plot: new RegExp(req.query.plot, "g") }, 
  //     { projection: { _id: 0, title:1, plot: 1 }})
  //     .toArray()
  //     res.json(movie)
  //   } catch(err){
  //     console.log(err)
  //   }  
  // } 
  // else 
  if (req.query.title){
    try {
      console.log(req.query.title)
      const movie = await movies.db
      .collection("movieDetails")
      .find({ title: new RegExp(req.query.title, "g") }, 
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
      .find({ actors: new RegExp(req.query.actors, "g") }, 
      { projection: { _id: 0, title:1, plot: 1 }})
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
      .find({ plot: new RegExp(req.query.plot, "g") }, 
      { projection: { _id: 0, title:1, plot: 1 }})
      .toArray()
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




// movieRouter.get("/writers", async(req,res,next) => {
//     try {
//       console.log(req.query.xxx)
//       const movie = await movies.db
//       .collection("movieDetails")
//       .find({ writers: req.query.xxx }, 
//       { projection: { _id: 0, title:1, writers: 1 }})
//       res.json(movie)
//     } catch (err){
//         console.log(err)
//     } 
//   }); 

module.exports = movieRouter; 