const mongoose=require('mongoose')


const MovieSchema= new mongoose.Schema({
    slug: {
        type: String,
        unique:true
    },
    title:{
        type:String,
        unique:true

    },
    rating:{
        type:Number
    }
    ,
    description:{
        type:String
    },
    actors:{
        type:String
    },
    trailer:{
        type:String
    },
    mdesc:{
        type:String
    },
    photo:{
        data:Buffer,
        contentType: String
    },
    film:{data:Buffer,
        contentType: String
    },
    genres:{type:String}
},{timestamps:true})

module.exports=mongoose.model('Movies',MovieSchema)