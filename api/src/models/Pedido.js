import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

//pedido data : id, nro_mesa(fk),nombre_estado(fk),id_local(fk))

export const Pedido = sequelize.define('pedidos', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
})


// todos estos son 1;N con la fk en pedido ↓↓


//! Aca faltaria como querramos definir el plato
//! podria tener la siguiente forma => (N;N) Pedido.belongsToMany(Plato,{Pedido_Plato})
