const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'brand_categories',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            title_i18n: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'i18n_lang_strings',
                    key: 'id',
                },
            },
            disabled: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            _context: {
                type: DataTypes.STRING(55),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'brand_categories',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'fk_brand_categories_title_i18n_idx',
                    using: 'BTREE',
                    fields: [{ name: 'title_i18n' }],
                },
            ],
        },
    );
