import app from './app.js';
import { sequelize } from './database/database.js';
import './models/User.js';

async function main (){
    try{
        app.listen(4000);
        await sequelize.sync({alter: true});
        console.log('conexion establecida.');
    }catch (error) {
        console.error('error en la conexion:', error);    
    }
}
main();