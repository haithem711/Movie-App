
const formidable = require('formidable');
const slugify = require('slugify');
const fs = require('fs');
const Movies=require('../models/movies')
const { smartTrim } = require('../helpers/movies');
const _=require('lodash')

exports.test=(req,res)=>{
    res.json('hello')
}
exports.create=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }
        const { title, description, genres,rating,actors,trailer } = fields;


        if (!title || !title.length) {
            return res.status(400).json({
                error: 'title is required'
            });
        }
        if (!actors || !actors.length) {
            return res.status(400).json({
                error: 'actors is required'
            });
        }
        if (!trailer || !trailer.length) {
            return res.status(400).json({
                error: 'trailer is required'
            });
        }

        if (!genres ) {
            return res.status(400).json({
                error: 'choose genre to the  movie'
            });
        }
        if (!rating ) {
            return res.status(400).json({
                error: 'write movie rating '
            });
        }
        

        if (!description || description.length < 5) {
            return res.status(400).json({
                error: 'Description is too short'
            });
        }
            let movies=new Movies()
            movies.rating=rating
            movies.actors=actors
            movies.trailer=trailer
            movies.title = title;
            movies.genres=genres;
            movies.description = description;
            movies.mdesc = smartTrim(description,100, ' ', ' ...');
            movies.slug = slugify(title).toLowerCase();
            movies.mtitle = `${title} | ${process.env.APP_NAME}`;
            
        // categories and tags
       
      //photo
        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            movies.photo.data = fs.readFileSync(files.photo.path);
            movies.photo.contentType = files.photo.type;
          
        } else {return res.status(400).json({error:'upload photo'})}

    
        //film
      /*  if (files.film) {
            if (files.film.size > 1000000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            movies.film.data = fs.readFileSync(files.film.path);
            movies.film.contentType = files.film.type;
            
        }*/


        movies.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: "error uploading movies"
                });
            }
            res.json(result);})









    })
}
exports.listall=(req,res)=>{

   Movies.find({}).select('title mdesc description  createdAt genres rating slug updatedAt').exec((err,result)=>{
if(err){return res.status(400).json({error:'error get movies'})}
 else {res.json(result)} 
   })
}
exports.list=(req,res)=>{
  
   const slug=req.params.slug.toLowerCase()
   Movies.findOne({slug}).select('title mdesc description  createdAt genres rating slug updatedAt photo trailer actors').exec((err,result)=>{
       if (err)return res.status(422).json({error:'error get movie'})
       else {res.json(result)}
   })
}

exports.deleteMovie=(req,res)=>{
   const slug=req.params.slug.toLowerCase()
   Movies.findOneAndDelete({slug}).exec((err,result)=>{
       if(err){return res.status(422).json({error:'delete failed'})}
       else {res.json ({message:'Delete Succesfully'})}
   })
}

exports.photo = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Movies.findOne({ slug })
        .select('photo')
        .exec((err, movie) => {
            if (err || !movie) {
                return res.status(400).json({
                    error: 'error photo'
                });
            }
            res.set('Content-Type', movie.photo.contentType);
            return res.send(movie.photo.data);
            
        });
};


 exports.Search = (req, res) => {
   
  
    const { search } = req.query;
    console.log(search);
   if (search) {
        Movies.find(
            {
                $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }]
            },
            (err, movie) => {
                if (err) {
                    return res.status(400).json({
                        error:'error search'
                    });
                }
                res.json(movie);
            }
        ).select('-photo')
    }
};
exports.filtre=(req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) :7;
    
    const{cat}=req.query
    const{rat}=req.query

    if((cat || rat)){
        Movies.find({
            $and: [{ genres: { $regex : cat }},{ rating: { $gte : rat }  } ]
        },(err,movie)=>{
            if(err)
            {return res.status(400).json({error:'error'})}
            res.json(movie)
        }).select('-photo')
        .limit(limit)
        .sort('-updatedAt')
    }
}

exports.update = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Movies.findOne({ slug }).exec((err, oldmovie) => {
        if (err) {
            return res.status(400).json({
                error: 'Error find'
            });
        }

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }

            let slugBeforeMerge = oldmovie.slug;
            oldmovie = _.merge(oldmovie, fields);
            oldmovie.slug = slugBeforeMerge;

            const { title, description, genres,rating,actors,trailer } = fields;

            if (description) {
                oldmovie.mdesc = smartTrim(description, 100, ' ', ' ...');
               
            }

            

           if(title){
               oldmovie.slug=slugify(title).toLowerCase()
           }

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    });
                }
                oldmovie.photo.data = fs.readFileSync(files.photo.path);
                oldmovie.photo.contentType = files.photo.type;
            }

            oldmovie.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error:'Error Update'
                    });
                }
                // result.photo = undefined;
                res.json(result);
            });
        });
    });
};
