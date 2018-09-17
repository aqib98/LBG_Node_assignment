/*
*Request handlers
*/

//dependencies
const _data = require('./data')
const helpers = require('./helpers')

//define the handlers
let handlers = {}

handlers.REST_api_1 = function(data,callback){
    let acceptableMethods = ['get']
    if(acceptableMethods.indexOf(data.method)>-1){
        handlers._REST_api_1[data.method](data,callback)
    }else{
        callback(405)
    }
}

handlers.REST_api_2 = function(data,callback){
    let acceptableMethods = ['get']
    if(acceptableMethods.indexOf(data.method)>-1){
        handlers._REST_api_2[data.method](data,callback)
    }else{
        callback(405)
    }
}

handlers.REST_api_3 = function(data,callback){
    let acceptableMethods = ['get']
    if(acceptableMethods.indexOf(data.method)>-1){
        handlers._REST_api_3[data.method](data,callback)
    }else{
        callback(405)
    }
}

//Container for the REST_api_1 sub method
handlers._REST_api_1 = {}

//Container for the REST_api_2 sub method
handlers._REST_api_2 = {}

//Container for the REST_api_3 sub method
handlers._REST_api_3 = {}

//REST_api_1 : get
//Required Data : fileName and fileType
//Optional Data : none
//@TODO : none yet
handlers._REST_api_1.get = function(data,callback){
    //Check that the file name is a string
    let fileName = typeof(data.queryStringObject.fileName)  == 'string' ? data.queryStringObject.fileName : false
    //Check that file type is valid 
    let fileType = typeof(data.queryStringObject.fileType) == 'string' && (data.queryStringObject.fileType == 'json' || data.queryStringObject.fileType == 'txt') ? data.queryStringObject.fileType : false
       
    if(fileName && fileType){
        //Lookup the user
        _data.read(fileName,fileType,function(err,data){
            if(!err && data){
            callback(200,data,fileType)
            }else{
            callback(404,{},fileType)
            }
        })
    }else{
        callback(400,{'Error':'File Name does not exist '},fileType)
    }
} 


//REST_api_2 : get
//Required Data : firstValue and secondValue
//Optional Data : none
//@TODO : none yet
handlers._REST_api_2.get = function(data,callback){
    //Check that the file name is a string
    let firstValue = isNaN(data.queryStringObject.firstValue) ? false : data.queryStringObject.firstValue
    //Check that file type is valid 
    let secondValue = isNaN(data.queryStringObject.secondValue) ? false : data.queryStringObject.secondValue
       console.log(Number(data.queryStringObject.firstValue))
       console.log(Number(data.queryStringObject.secondValue))
       console.log(firstValue)
       console.log(secondValue)
    if(firstValue && secondValue){
        let product = firstValue*secondValue
        let productJSON = {'product':product}
        callback(200,productJSON,false)
    }else{
        callback(400,{'Error':'Given input is  not appropriate '},false)
    }
} 

//REST_api_3 : get
//Required Data : stringInput
//Optional Data : none
//@TODO : none yet
handlers._REST_api_3.get = function(data,callback){
    let stringInput = typeof(data.queryStringObject.stringInput) == 'string' ? data.queryStringObject.stringInput : false
    if(stringInput){
        let nonRepeatingFirstValue= ''
         nonRepeatingFirstValue=stringInput.split('').filter(function (character, index, obj) {
            return obj.indexOf(character) === obj.lastIndexOf(character);
        }).shift();
        console.log(nonRepeatingFirstValue)
        if(nonRepeatingFirstValue!=undefined){
            if(nonRepeatingFirstValue.length==0){
                nonRepeatingFirstValue='invalid input or no non-repeating characters'
            }
        }else{
            nonRepeatingFirstValue='invalid input or no non-repeating characters'
        }
        
        let productJSON = {'nonRepeatingFirstValue':nonRepeatingFirstValue}
        callback(200,productJSON,false)
    }else{
        callback(400,{'Error':'Given input is  not appropriate '},false)
    }
} 



//not found handler
handlers.notFound = function(data,callback){
    //callback a 404 status code
    callback(404)
}



//Export Handlers
module.exports = handlers

