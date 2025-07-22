const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const path = require('path');

// Configuración de la base de datos
const config = require('../config/database');
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

// Configuración de Umzug para manejar migraciones
const umzug = new Umzug({
    migrations: {
        glob: path.join(__dirname, '../database/migrations/*.js'),
        resolve: ({ name, path: migrationPath, context }) => {
            const migration = require(migrationPath);
            return {
                name,
                up: async () => migration.up(context, Sequelize),
                down: async () => migration.down(context, Sequelize),
            };
        },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

class MigrationManager {
    async runMigrations() {
        try {
            console.log('🚀 Ejecutando migraciones pendientes...');
            const migrations = await umzug.up();
            
            if (migrations.length === 0) {
                console.log('✅ No hay migraciones pendientes');
            } else {
                console.log('✅ Migraciones ejecutadas:', migrations.map(m => m.name));
            }
            
            return migrations;
        } catch (error) {
            console.error('❌ Error ejecutando migraciones:', error);
            throw error;
        }
    }

    async rollbackMigration(steps = 1) {
        try {
            console.log(`🔄 Revirtiendo ${steps} migración(es)...`);
            const migrations = await umzug.down({ step: steps });
            console.log('✅ Migraciones revertidas:', migrations.map(m => m.name));
            return migrations;
        } catch (error) {
            console.error('❌ Error revirtiendo migraciones:', error);
            throw error;
        }
    }

    async getPendingMigrations() {
        try {
            const pending = await umzug.pending();
            return pending.map(m => m.name);
        } catch (error) {
            console.error('❌ Error obteniendo migraciones pendientes:', error);
            throw error;
        }
    }

    async getExecutedMigrations() {
        try {
            const executed = await umzug.executed();
            return executed.map(m => m.name);
        } catch (error) {
            console.error('❌ Error obteniendo migraciones ejecutadas:', error);
            throw error;
        }
    }

    async checkMigrationStatus() {
        try {
            const [pending, executed] = await Promise.all([
                this.getPendingMigrations(),
                this.getExecutedMigrations()
            ]);

            console.log('\n📊 Estado de migraciones:');
            console.log(`✅ Ejecutadas: ${executed.length}`);
            console.log(`⏳ Pendientes: ${pending.length}`);
            
            if (executed.length > 0) {
                console.log('\n✅ Migraciones ejecutadas:');
                executed.forEach(name => console.log(`  - ${name}`));
            }
            
            if (pending.length > 0) {
                console.log('\n⏳ Migraciones pendientes:');
                pending.forEach(name => console.log(`  - ${name}`));
            }

            return { pending, executed };
        } catch (error) {
            console.error('❌ Error verificando estado de migraciones:', error);
            throw error;
        }
    }
}

module.exports = {
    MigrationManager,
    umzug,
    sequelize
};
