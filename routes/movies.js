
const express=require('express')
router=express.Router()
const { test,create,listall,list,update,deleteMovie,photo,Search,filtre} = require('../controllers/movies')
const Movies=require('../models/movies')


router.get('/hello',test)
router.post('/create',create)
router.get('/movies',listall)
router.get('/moviess/:slug',list)

router.delete('/delete/:slug',deleteMovie)
router.get('/movies/photo/:slug',photo);
router.put('/moviess/:slug',update)
router.get('/movies/search',Search);

router.get('/movies/filtre', filtre);
module.exports=router