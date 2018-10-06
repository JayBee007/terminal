export default (sequelize, DataTypes) => {
  const File = sequelize.define('file', {
    type: DataTypes.STRING,
    filepath: DataTypes.STRING,
    filename: DataTypes.STRING,
  });

  File.associate = (models) => {
    // 1:m
    File.belongsTo(models.Message, {
      foreignKey: { name: 'messageId', field: 'message_id' },
    });
  };


  return File;
};
