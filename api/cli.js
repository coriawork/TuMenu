#!/usr/bin/env node

const { MigrationManager } = require('./database/migrationManager');
const path = require('path');

const migrationManager = new MigrationManager();

async function main() {
    const command = process.argv[2];
    const argument = process.argv[3];

    switch (command) {
        case 'migrate':
            await migrationManager.runMigrations();
            break;
            
        case 'rollback':
            const steps = parseInt(argument) || 1;
            await migrationManager.rollbackMigration(steps);
            break;
            
        case 'status':
            await migrationManager.checkMigrationStatus();
            break;
            
        case 'pending':
            const pending = await migrationManager.getPendingMigrations();
            console.log('Migraciones pendientes:', pending);
            break;
            
        case 'executed':
            const executed = await migrationManager.getExecutedMigrations();
            console.log('Migraciones ejecutadas:', executed);
            break;
            
        case 'create':
            if (!argument) {
                console.error('❌ Debes proporcionar un nombre para la migración');
                console.log('Uso: node cli.js create nombre-de-la-migracion');
                process.exit(1);
            }
            await createMigration(argument);
            break;
            
        default:
            console.log(`
🛠️  Herramienta de migraciones de base de datos

Comandos disponibles:
  migrate           - Ejecuta todas las migraciones pendientes
  rollback [pasos]  - Revierte las últimas migraciones (por defecto 1)
  status            - Muestra el estado de todas las migraciones
  pending           - Lista las migraciones pendientes
  executed          - Lista las migraciones ejecutadas
  create <nombre>   - Crea una nueva migración

Ejemplos:
  node cli.js migrate
  node cli.js rollback 2
  node cli.js status
  node cli.js create add-user-avatar-field
            `);
    }
    
    process.exit(0);
}

async function createMigration(name) {
    const timestamp = new Date().toISOString()
        .replace(/[-:]/g, '')
        .replace('T', '')
        .slice(0, 14);
    
    const filename = `${timestamp}-${name}.js`;
    const migrationPath = path.join(__dirname, 'database', 'migrations', filename);
    
    const template = `'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
`;

    const fs = require('fs');
    fs.writeFileSync(migrationPath, template);
    console.log(`✅ Migración creada: ${filename}`);
}

// Manejo de errores
process.on('unhandledRejection', (error) => {
    console.error('❌ Error no manejado:', error);
    process.exit(1);
});

main().catch((error) => {
    console.error('❌ Error ejecutando comando:', error);
    process.exit(1);
});
