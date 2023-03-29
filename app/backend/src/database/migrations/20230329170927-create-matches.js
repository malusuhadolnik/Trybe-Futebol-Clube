'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeamGoals: {
        allowNull: true,
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeamGoals: {
        allowNull: true,
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        field: 'home_team_id',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        field: 'away_team_id',
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
