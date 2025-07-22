# Sistema de Migraciones de Base de Datos

Este proyecto utiliza Sequelize CLI y Umzug para manejar migraciones de base de datos de manera robusta y profesional.

### Comandos Básicos

```bash
# Ejecutar todas las migraciones pendientes
npm run migrate

# Revertir la última migración
npm run rollback

# Ver estado de migraciones
npm run migration:status

# Crear una nueva migración
npm run migration:new nombre-de-la-migracion

# Inicializar base de datos (ejecutar migraciones)
npm run db:init

# Resetear base de datos (revertir todo y volver a ejecutar)
npm run db:reset

# Configurar base de datos completa (init + seed)
npm run db:setup
```

### Comandos con Sequelize CLI

```bash
# Crear base de datos
npm run db:create

# Eliminar base de datos
npm run db:drop

# Ejecutar migraciones (Sequelize CLI)
npm run db:migrate

# Revertir última migración (Sequelize CLI)
npm run db:migrate:undo

# Revertir todas las migraciones
npm run db:migrate:undo:all

# Ejecutar seeders
npm run db:seed

# Revertir seeders
npm run db:seed:undo

# Crear nueva migración (Sequelize CLI)
npm run migration:create nombre-de-la-migracion

# Crear nuevo seeder
npm run seed:create nombre-del-seeder
```

### Comandos con CLI Personalizado

```bash
# Ejecutar migraciones
node cli.js migrate

# Revertir migraciones (especificar número de pasos)
node cli.js rollback 2

# Ver estado de migraciones
node cli.js status

# Ver migraciones pendientes
node cli.js pending

# Ver migraciones ejecutadas
node cli.js executed

# Crear nueva migración
node cli.js create nombre-de-la-migracion
```

## 📁 Estructura de Archivos

```
api/
├── database/
│   ├── migrations/         # Archivos de migración
│   ├── seeders/           # Archivos de datos de prueba
│   ├── migrationManager.js # Gestor de migraciones
│   └── initializer.js     # Inicializador de base de datos
├── config/
│   ├── database.js        # Configuración de DB para Sequelize CLI
│   └── db.js             # Configuración de conexión actual
├── app/
│   └── models/
│       ├── index.js      # Índice de modelos
│       └── Usuario.js    # Modelo de ejemplo
├── .sequelizerc          # Configuración de Sequelize CLI
└── cli.js               # CLI personalizado para migraciones
```

## 🛠️ Creando Migraciones

### 1. Crear una nueva migración

```bash
npm run migration:new add-avatar-to-users
```

### 2. Editar el archivo de migración

```javascript
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'avatar');
  }
};
```

### 3. Ejecutar la migración

```bash
npm run migrate
```

## 📊 Tipos de Migraciones Comunes

### Crear tabla

```javascript
await queryInterface.createTable('productos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  precio: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
});
```

### Agregar columna

```javascript
await queryInterface.addColumn('usuarios', 'fecha_nacimiento', {
  type: Sequelize.DATE,
  allowNull: true
});
```

### Modificar columna

```javascript
await queryInterface.changeColumn('usuarios', 'nombre', {
  type: Sequelize.STRING(100),
  allowNull: false
});
```

### Eliminar columna

```javascript
await queryInterface.removeColumn('usuarios', 'campo_obsoleto');
```

### Agregar índice

```javascript
await queryInterface.addIndex('usuarios', ['email'], {
  unique: true,
  name: 'usuarios_email_unique'
});
```

### Crear foreign key

```javascript
await queryInterface.addConstraint('pedidos', {
  fields: ['usuario_id'],
  type: 'foreign key',
  name: 'fk_pedidos_usuario',
  references: {
    table: 'usuarios',
    field: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
```

## 🌱 Seeders

Los seeders te permiten poblar la base de datos con datos de prueba:

### Crear un seeder

```bash
npm run seed:create demo-productos
```

### Ejecutar seeders

```bash
npm run db:seed
```

### Revertir seeders

```bash
npm run db:seed:undo
```

## ✅ Mejores Prácticas

1. **Siempre incluir rollback**: Cada migración debe tener un método `down` que revierta los cambios
2. **Nombres descriptivos**: Usar nombres claros como `add-email-index-to-users`
3. **Atomic changes**: Una migración por cambio lógico
4. **Backup antes de producción**: Siempre hacer backup antes de ejecutar migraciones en producción
5. **Probar rollbacks**: Verificar que el rollback funciona correctamente
6. **No modificar migraciones ejecutadas**: Crear nuevas migraciones para cambios adicionales

## 🚨 Comandos de Emergencia

### En desarrollo

```bash
# Resetear completamente la base de datos
npm run db:reset

# Reconfigurar desde cero
npm run db:drop && npm run db:create && npm run db:setup
```

### En producción

```bash
# Ver estado antes de hacer cambios
npm run migration:status

# Backup de la base de datos (manual)
mysqldump -u usuario -p nombre_base > backup.sql

# Ejecutar migraciones
npm run migrate

# Si algo sale mal, revertir
npm run rollback
```

## 🔧 Configuración

### Variables de entorno necesarias

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=tu_base_datos
DB_PORT=3306
NODE_ENV=development
```

### Configuración para diferentes entornos

El archivo `config/database.js` maneja automáticamente diferentes configuraciones basadas en `NODE_ENV`:

- `development`: Para desarrollo local
- `test`: Para pruebas automatizadas
- `production`: Para el servidor de producción
