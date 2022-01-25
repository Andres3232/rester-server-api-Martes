
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    //constructor
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //middlewares
        this.middlewares()
        this.routes()
        this.conectarDB()

    }
    //metodos

    middlewares() {

        //cors
        this.app.use( cors() );

        //lectura y parseo de body
        this.app.use( express.json() );

        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.usuariosPath, require('../routes/usuarios') )
    }

    async conectarDB(){
        await dbConnection()
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor coorriendo en puerto', this.port);
            
        } )
    }

}

module.exports = Server;



