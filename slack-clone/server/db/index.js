import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  dialect: 'postgres',
  define: {
    underscored: true,
  },
  operatorsAliases: false,
});

const models = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message'),
  Channel: sequelize.import('./channel'),
  Member: sequelize.import('./member'),
  DirectMessage: sequelize.import('./directMessage'),
  File: sequelize.import('./file'),
  ChannelMember: sequelize.import('./channelMember'),
};

Object.keys(models).forEach((model) => {
  if ('associate' in models[model]) {
    models[model].associate(models);
  }
});


models.sequelize = sequelize;
models.Sequelize = Sequelize;
export default models;
