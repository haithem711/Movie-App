if(process.env.NODE_ENV==='production'){
   module.exports={APP_URL:'https://movietn.herokuapp.com'} 
}else{
    module.exports = {APP_URL:'http://localhost:5000'}
}

  