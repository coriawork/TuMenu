import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Menu = sequelize.define('menus', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
})
