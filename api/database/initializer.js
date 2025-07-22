const { MigrationManager } = require('./database/migrationManager');
const { sequelize } = require('./database/migrationManager');

class DatabaseInitializer {
    constructor() {
        this.migrationManager = new MigrationManager();
    }

    async initialize() {
        try {
            console.log('🔄 Inicializando base de datos...');
            
            // Verificar conexión
            await this.checkConnection();
            
            // Ejecutar migraciones pendientes
            await this.migrationManager.runMigrations();
            
            console.log('✅ Base de datos inicializada correctamente');
        } catch (error) {
            console.error('❌ Error inicializando base de datos:', error);
            throw error;
        }
    }

    async checkConnection() {
        try {
            await sequelize.authenticate();
            console.log('✅ Conexión a la base de datos establecida');
        } catch (error) {
            console.error('❌ No se pudo conectar a la base de datos:', error);
            throw error;
        }
    }

    async reset() {
        try {
            console.log('🔄 Reseteando base de datos...');
            
            // Revertir todas las migraciones
            const executed = await this.migrationManager.getExecutedMigrations();
            if (executed.length > 0) {
                await this.migrationManager.rollbackMigration(executed.length);
            }
            
            // Ejecutar todas las migraciones de nuevo
            await this.migrationManager.runMigrations();
            
            console.log('✅ Base de datos reseteada correctamente');
        } catch (error) {
            console.error('❌ Error reseteando base de datos:', error);
            throw error;
        }
    }

    async seedDatabase() {
        try {
            console.log('🌱 Poblando base de datos con datos de prueba...');
            
            const { exec } = require('child_process');
            const util = require('util');
            const execPromise = util.promisify(exec);
            
            await execPromise('npx sequelize-cli db:seed:all');
            
            console.log('✅ Base de datos poblada con datos de prueba');
        } catch (error) {
            console.error('❌ Error poblando base de datos:', error);
            throw error;
        }
    }
}

module.exports = { DatabaseInitializer };
