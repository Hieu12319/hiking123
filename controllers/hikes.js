const express = require("express");
const hikeRouter = express.Router();
const Hike = require('../models/hike');
 const hikeSeed = require("../models/hikeSeed");


//exports
module.exports = hikeRouter;


// routes index new delete update edit  show
//index
hikeRouter.get('/hikes', (req, res) => {
    Hike.find({}, (err, allHikes) => {
         console.log(allHikes)
        res.render('index.ejs', {allHikes: allHikes,});
    });
 });

 hikeRouter.get('/seed', (req, res) => {
     Hike.deleteMany({}, (err, deletedHikes) => {
        Hike.create(hikeSeed, (err, data) => {
            res.redirect('/hikes');
        });
    })
 });


// render a new page
hikeRouter.get('/hikes/new', (req, res) => {
    res.render('new.ejs');
});


//delete
hikeRouter.delete("/hikes/:id", (req, res) => {
    Hike.findByIdAndDelete(req.params.id, (err, deletedHike) => {
        res.redirect("/hikes");

    });
});
//update
hikeRouter.put('/hikes/:id', (req, res) => {
    console.log(req.body)
    req.body.completed = !!req.body.completed;
    Hike.findByIdAndUpdate(req.params.id, req.body,(err, updatedHike) => {
        if (err) console.log(err)
        res.redirect(`${req.params.id}`);
    });
});
// Create
 hikeRouter.post('/hikes', (req, res) => {
     console.log(req.body.completed)
     req.body.completed == !!req.body.completed;
     Hike.create(req.body, (err, createdHike) => {
         if (err) {
           console.log(err);
           res.send(err);
        } else {
           res.redirect('/hikes');
       };
    });
 });
//   hikeRouter.post("/hikes/:id", (req, res) => {
//     // convert readyToEat to a Boolean(true/false)
//      if(req.body.completed ==="on"){
//        req.body.completed = true
//       }else{
//         req.body.completed = false
//       }
//       hike[req.params.id] = req.body
//       res.redirect("/hikes")
//   })



// edit

hikeRouter.get('/hikes/:id/edit', (req, res) => {
   Hike.findById(req.params.id, (err, Hike) => {
        res.render('edit.ejs', {Hike,
        index: req.params.id});
    });
});



//show
hikeRouter.get('/hikes/:id', (req, res) => {
    Hike.findById(req.params.id, (err, foundHike) => {
        res.render('show.ejs', {hike: Hike,
        index: req.body});
    });
});


