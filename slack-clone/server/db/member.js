export default (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValues: false,
    },
  });

  return Member;
};
