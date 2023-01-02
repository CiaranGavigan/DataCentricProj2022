# ABOUT

This module acts as a wrapper for mysql using promises to make your workflow easier.

# TO INSTALL
`npm i mysql-with-promises`

# TO CONNECT

### CommonJS
`const connect = require('mysql-with-promises').connect`
`const connection = connect('localhost', 'root', 'password', '<database-name (optional)'>')`

### ES6 Modules

`import {connect} from 'mysql-with-promises'`
`const connection = connect('localhost', 'root', 'password', '<database-name (optional)'>')`

**You can also connect using a url by passing the url into the connect function**
`const connection = connect(url)`

# TO QUERY

### Standard Promise Syntax

```connection.query(sql).then(response => {
    console.log(response.result)
    console.log(response.fields)
})
```

### async/await
#### Wrapped in an async function with a try/catch block
```async () => {
    try {
    const response = await connection.query(sql)
    console.log(response.result)
    console.log(response.fields)
   } catch (error) {
        console.log(error)
   }
    
}
```
