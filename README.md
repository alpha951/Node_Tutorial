Author :- [alpha951](https://github.com/alpha951)
<br>
**This repository consists of Notes and Code of tutorial by John Smilga from Coding Addict Youtube Channel. I have made this repository for my own reference and for others who are interested in learning**

- **[Youtube Video Link](https://www.youtube.com/watch?v=TNV0_7QRDwY&list=PLnHJACx3NwAdT_8forzXYvx0o4A2VnoHX&index=8)**
- **[Course-api (for slides and APIs)](https://course-api.com/)**


# Node.Js Notes

- Created: June 4, 2023 9:34 PM
- Created By: Keshav Carpenter
- Date: June 4, 2023
- Last Edited By: Keshav Carpenter
- Last Edited Time: June 5, 2023 3:44 PM
- Stakeholders: Keshav Carpenter
- Status: Completed
- Type: Dev
- Tool: Notion

# What is Node.Js

- Environment for running JS code outside of browser
- Built on Chrome's V8 JS engine
- Browser engine compiles our code to machine code
- It's is based on C++ and written in C++

# Node.Js vs JS in Browser

## Browser

1. DOM
2. Window
3. Interactive Apps
4. No Filesystem
5. Fragmentation
6. ES6 Modules

## **Node**

1. No DOM
2. No Window :- Unlike browser we can't use window object and it's property
3. Server Side App
4. Filesystem
5. Versions
6. CommonJS

# Node.Js features

## Globals in Node

```jsx
 GLOBALS  - NO WINDOW !!!!

 __dirname  - path to current directory
 __filename - file name
 require    - function to use modules (CommonJS)
 module     - info about current module (file)
process    - info about env where the program is being executed
```

## REPL

Read Evaluate Print Loop. Evaluate Node Code  

## CLI

 Command line interface

## Node Modules

- CommonJS, every file is module (by default)
- Modules - Encapsulated Code (only share minimum)
- If a module is envoling a function in itself then just by importing it in other file it will invoke that function without explicitly calling in that file.

[node-express-course/07-mind-grenade.js at main · john-smilga/node-express-course](https://github.com/john-smilga/node-express-course/blob/main/01-node-tutorial/07-mind-grenade.js)

## Inbuilt Node Module

### 1. OS Module

```jsx
const os = require('os')
// info about current user
const user = os.userInfo()
console.log(user)

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`)

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
}
console.log(currentOS)
```

### 2. Path Module

```jsx
const path = require('path')

console.log(path.sep)

const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)
```

### 3. Fs Module (sync)

```jsx
const { readFileSync, writeFileSync } = require('fs')
console.log('start')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')

writeFileSync(
  './content/result-sync.txt',
  `Here is the result : ${first}, ${second}`,
  { flag: 'a' }
)
console.log('done with this task')
console.log('starting the next one')
```

### 4. Fs Module (async)

```jsx
const { readFile, writeFile } = require('fs')

console.log('start')
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  const first = result
  readFile('./content/second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result
    writeFile(
      './content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('done with this task')
      }
    )
  })
})
console.log('starting next task')
```

### 5. HTTP Module

```jsx
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req)
    if (req.url === '/') {
        res.end('Welcome to our home page')
        return
    }
    if (req.url === '/about') {
        res.end('Here is our short history')
        return
    }
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `)
})

server.listen(5000,()=>{
 console.log('Server is up and running at Port 5000')
})
```

## NPM

It’s a node package manager comes with Node installation.

### Package.json

`package.json` is a JSON file that contains information about a Node.js project, including its name, version, description, entry point, dependencies, and more. It is used by Node.js's package manager, `npm`, to install and manage packages that the project depends on. The file can be created by running the command `npm init` in the project's root directory, and it can be edited manually or using the `npm` command line tool. The file should be committed to version control along with the project's source code.

run `npm init -y`  to create the package.json file

```jsx
{
  "name": "tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "1-intro.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.20"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```

```jsx
to install a dev dependency run the command 
npm i {packageName} -D  
or 
npm i {packageName} --save-dev

to install global dependency
npm install -g {package} 
```

```jsx
We can write custom scripts in package.json file.

"scripts" :{
"start": "node app.js"
"dev" : "nodemon app.js"
}

we can run these scripts by npm start, npm run dev [sometime we need to use `run` 
before the script name]
```

```jsx
To uninstall a node module run `npm uninstall {package}`
```

### Package-lock.json

`package-lock.json` is an automatically generated file that describes the exact tree of installed packages in a project. This file serves as a single source of truth for the installed dependencies and their versions. It is used by `npm` to resolve dependencies and ensure that all packages are installed at the right version. It should not be modified manually and should be committed to version control along with `package.json`.

> In a node module’s version number the first number describes the major change in package, the second number is a minor change and provide backward compatibility with the older package of same major version. The last number describes small patches in the package.
>

# Advanced Topics

## Event Loop

### Event Loop

Node.js is based on an event-driven architecture. This means that it is designed to handle I/O operations and callbacks in an efficient manner. The event loop is the mechanism that Node.js uses to handle asynchronous I/O operations.

When an I/O operation is performed, such as reading data from a file or making an HTTP request, Node.js registers a callback function to be executed when the operation is complete. The event loop is responsible for monitoring the completion of I/O operations and executing the corresponding callback functions.

The event loop works by processing a queue of events, each of which corresponds to an I/O operation and its associated callback function. When an I/O operation is completed, the corresponding callback function is added to the queue. The event loop then processes the queue of events, executing each callback function in turn.

This approach allows Node.js to handle a large number of concurrent I/O operations without blocking the main thread of execution. Instead, the event loop ensures that callbacks are executed asynchronously, allowing Node.js to handle many I/O operations in parallel.

## Blocking Code

```jsx
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Home Page')
  }
  if (req.url === '/about') {
    // blocking code
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i} ${j}`)
      }
    }
    res.end('About Page')
  }
  res.end('Error Page')
})

server.listen(5000, () => {
  console.log('Server listening on port : 5000....')
})
```

In the above code if a user is requesting to `/about`  then he will be blocking the whole resources and users who are requesting to ‘`/`'  or any other invalid endpoints will also be get blocked. The reason is after the callback inside the `createServer` method the rest code is still synchronous.

## Async Pattern

```jsx
const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
getText('./content/first.txt')
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
```

We are transforming the async fs code into promise to avoid callback hells and blocking codes.

### Refactored async code using Native Node.Js Method

```jsx
const { readFile, writeFile } = require('fs').promises  
/** if we don't use promises on require('fs') then we will need to use `util` module to create 
promise version of  readFile and writeFile funcitons. By using this method we are avoiding writing promises on our 
own unlike getText() function in above code block which returns a promise.
**/

// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

const start = async () => {
  try {
    const first = await readFile('./content/first.txt', 'utf8')
    const second = await readFile('./content/second.txt', 'utf8')
    await writeFile(
      './content/result-mind-grenade.txt',
      `THIS IS AWESOME : ${first} ${second}`,
      { flag: 'a' }
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()
```

## Events in Node.Js

Node.js makes extensive use of events to allow different parts of the program to communicate with one another. Events are essentially signals that are emitted by an object when a certain action occurs. Other parts of the program can then listen for these events and respond accordingly.

In Node.js, events are handled using the EventEmitter class, which is part of the core Node.js library. To use events in your program, you first need to create an instance of the EventEmitter class. You can then register event listeners on this instance, which will be called whenever the corresponding event is emitted.

For example, you could use events to handle incoming HTTP requests in a web server. You would create an instance of the EventEmitter class, and register a listener for the "request" event on this instance. When a new HTTP request is received, the server would emit a "request" event, which would trigger the listener function.

```jsx
const EventEmitter = require('events')

// EventEmitter is a class. We are creating a Object of this class below
const myEmitter = new EventEmitter()

myEmitter.on('event', () => {
  console.log('an event occurred!')
})

myEmitter.emit('event')

```

In the above example, we create an instance of the EventEmitter class and register an event listener for the "event" event. When the `emit()` method is called on the instance and the "event" event is emitted, the listener function will be called and the message "an event occurred!" will be printed to the console.

```jsx
// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events')
// creating ans instance of EventEmitter class
const customEmitter = new EventEmitter()

// 'on' and 'emit' methods
// keep track of the order of different .on() methods
// additional arguments :- don't break the code
// built-in modules utilize it  :- for example http server

customEmitter.on('response', (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`)
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

customEmitter.emit('response', 'john', 34)
```

```jsx
const http = require('http')

// `Usual method of creating a http server`
// const server = http.createServer((req, res) => {
//   res.end('Welcome')
// })

// Using Event Emitter API
const server = http.createServer()
// emits request event
// subcribe to it / listen for it / respond to it
server.on('request', (req, res) => {
  res.end('Welcome')
})

server.listen(5000)
```

## Streams in Node

```jsx
const { createReadStream } = require('fs')

// default 64kb
// last buffer - remainder
// highWaterMark - control size of single stream (in bytes)
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })

const stream = createReadStream('./content/big.txt',{highWaterMark: 90000, encoding: 'utf8'})

stream.on('data', (result) => {
  console.log(result)
})
stream.on('error', (err) => console.log(err))
```

```jsx
var http = require('http')
var fs = require('fs')

http
  .createServer(function (req, res) {

  // this will send the whole file at once, so for large files it will create issues
    // const text = fs.readFileSync('./content/big.txt', 'utf8')
    // res.end(text)

    const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
    fileStream.on('open', () => {
      fileStream.pipe(res)  // data will be sent in chunks 
 //https://www.educative.io/answers/what-is-stream-module-pipe-in-nodejs
    })
    fileStream.on('error', (err) => {
      res.end(err)
    })
  })
  .listen(5000)
```

[Understanding Streams in Node.js](https://nodesource.com/blog/understanding-streams-in-nodejs/)
