export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Channel.associate = (models) => {
    // 1:m
    Channel.belongsTo(models.Team, {
      foreignKey: { name: 'teamId', field: 'team_id' },
    });

    Channel.belongsToMany(models.User, {
      through: models.ChannelMember,
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });
  };


  return Channel;
};
