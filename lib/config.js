/* 
 *Create and export configuration variables
 *
 * 
 * 
 */

//Container for all the environments
let environments = {};

//Staging the environment
environments.staging = {
    'httpPort' : 3001,
    'envName' : 'staging',

}

//Determine which environment was passed as a command-line arguement
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

//Check if the current environment is one of the environments above, if not, default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging

//Export the module 
module.exports = environmentToExport