const express = require("express");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const { connection: movies } = mongoose;
const movieRouter = express.Router();

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

movieRouter.get("/home", async(req,res,next) => {
  try {
    var currentTime = new Date()
    var currentYear = currentTime.getFullYear() 
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



movieRouter.get("/movies/:id", async(req,res,next) => {
    try {
      const movie = await movies.db
      .collection("movieDetails")
      .findOne({ _id: new ObjectId(req.params.id) }, 
      { projection: { _id: 0, title:1, plot: 1, poster: 1  }})
      res.json(movie)
    } catch (err){
        console.log(err)
    } 
  });

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

module.exports =movieRouter; 