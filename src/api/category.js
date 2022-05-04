// 所有类目的接口

import instance from '../../axios';

export default {
  list(params) {
    return instance.get('/category/all', { params });
  },
};
