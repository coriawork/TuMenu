import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { Pedido } from "./Pedido.js";

export const Mesa = sequelize.define('mesas', {
    nro_mesa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
});
// * Esto es para definir que hay una relacion 1:N entre Mesa y Pedido (la fk esta en Pedido) */
Mesa.hasMany(Pedido, { foreignKey: 'nro_mesa' });