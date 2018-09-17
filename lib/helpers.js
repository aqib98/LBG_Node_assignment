/*
 * Helpers for various tasks
 */

//Container for all helpers
let helpers = {}

helpers.parseJSONToObject = function(str){
    try{
        let obj = JSON.parse(str)
        return obj
    }catch(e){
        return{}
    }
}

//Export helpers
module.exports = helpers