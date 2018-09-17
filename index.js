/*
* Primary file for the API
*
*
*
*/

//Dependencies
const http = require('http')
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder
const fs = require('fs')
const config = require('./lib/config')
const helpers = require('./lib/helpers')
const handlers = require('./lib/handlers')  


//Instantiating the http server
let httpServer = http.createServer(function(req,res){
    unifiedServer(req,res)
})

//Start the http server
httpServer.listen(config.httpPort,function(){
    console.log('The server is running on the http port ',config.httpPort)
})

//All server logic for the http server
let unifiedServer = function(req,res){

    //Get the URL and parse it
    let parsedURL = url.parse(req.url,true)

    //Get path from the URL
    let path = parsedURL.pathname
    let trimmedPath = path.replace(/^\/+|\/+$/g,'')

    //Get the query string object
    let queryStringObject = parsedURL.query

    //Get the method
    let method = req.method

    //Get the headers as an object
    let headers = req.headers

    //Get the payload 
    let decoder = new stringDecoder('utf-8')
    let buffer = ''
    req.on('data',function(data){
        buffer += decoder.write(data)
    })
    req.on('end',function(){
        buffer += decoder.end()
    })
    //Choose the handler this request should go. If one is not found, use the notFound handler
    let chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

    //Construct a data object to send to the handler 
    let data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method.toLowerCase(),
        'headers' : headers,
        'payload' : helpers.parseJSONToObject(buffer)
    }

    //Route the request to the handler specified by the user
    chooseHandler(data,function(statusCode,payload,conentType){
        console.log('content-type----',conentType)
        //Use status code given by the handler or, default to 200
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200


        console.log('payload---->',payload)
        //Use status code given by the handler or, default to an empty object

        //Convert the payload into string
        let payloadString = ''
        if(conentType=='json'){
         payload = typeof(payload) == 'object' ? payload : {}
         payloadString = JSON.stringify(payload)
        }else if(conentType=='txt'){
            payloadString = payload
                
        }else{
            payload = typeof(payload) == 'object' ? payload : {}
            payloadString = JSON.stringify(payload)
        }


        //Return the response content type 
        
        if(conentType){
            if(conentType == 'txt'){
                res.setHeader('Content-type','text/javascript')
            }else if(conentType == 'json'){
                res.setHeader('Content-type','application/json')
            }
        }else{
            res.setHeader('Content-type','application/json')
        }

        //Return the response code
        res.writeHead(statusCode)

        //Return the response
        res.end(payloadString)
    })
}

//defining a request router
let router = {
    'REST_api_1' : handlers.REST_api_1,
    'REST_api_2' : handlers.REST_api_2,
    'REST_api_3' : handlers.REST_api_3
}