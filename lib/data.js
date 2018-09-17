/* 
* Library for storing and editing the data
* 
* 
*/

//dependencies
const fs = require('fs')
const path = require('path')
const helpers = require('./helpers')

//Container library for the module
let lib = {}

//Base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/')

//Read data from the file
lib.read = function(file,fileType,callback){
    fs.readFile(lib.baseDir+file+'.'+fileType,'utf8',function(err,data){
        
        if(!err && data){
            let parsedData = ''
            if(fileType=='json'){
                parsedData = helpers.parseJSONToObject(data)
            }else if(fileType = 'txt'){
                parsedData = data
            }
            callback(false,parsedData)
        }else{
            callback(err,data)
        }
    })
}

//Export the module
module.exports = lib