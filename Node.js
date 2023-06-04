// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

//! import modules

const names = require('./name.js')

const john = 'John'
const Susan = 'Susan'
const peter = 'Peter'

console.log(__dirname);
console.log(__filename);
console.log(module)

//! es6 module
// export default john
export default Susan

//! cjs module
// module.exports = { john, Susan }