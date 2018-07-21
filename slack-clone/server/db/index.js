import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: false,
});

const models = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message'),
  Channel: sequelize.import('./channel'),
};

Object.keys(models).forEach((model) => {
  if ('associate' in models[model]) {
    models[model].associate(models);
  }
});


models.sequelize = sequelize;
models.Sequelize = Sequelize;
export default models;
