import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { Pedido } from "./Pedido.js";

export const Estado = sequelize.define('estados', {
    nombre:{
        type: DataTypes.STRING,
        primaryKey: true,
    }
},
{
    timestamps: false,
}
);

// * esto es para definir que hay una relacion 1:N entre Estado y Pedido (la fk esta en Pedido)
Estado.hasMany(Pedido, { foreignKey: 'nombre_estado' });