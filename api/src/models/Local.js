import { DataTypes } from "sequelize";
import {Menu} from "./Menu.js";
import { Pedido } from "./Pedido.js";
import { sequelize } from "../database/database.js";


export const Local = sequelize.define('locales', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}) 

Local.belongsTo(Menu,{foreignKey: 'id_menu'});
Local.hasMany(Pedido, { foreignKey: 'id_local' });