const server = require('./app')
const PORT = 3001
const connection = require('./db_conn')

server.listen(PORT, async()=>{
    try {
        await connection
        console.log('Connected to DB');
        console.log('Server listen on port: ' + PORT);
    } catch (error) {
        console.log(error);
    }
})