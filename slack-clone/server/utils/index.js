/* eslint import/prefer-default-export: 0 */
import _ from 'lodash';
import sharp from 'sharp';

export const formatErrors = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }

  return [{ path: 'name', message: 'something went wrong' }];
};


export const fileResize = sharp()
  .resize(300);
