import instance from '../../axios';

export default {
  list(params) {
    return instance.get('/products/all', { params });
  },
  remove(params) {
    return instance.delete(`/products/${params.id}`);
  },
  add(params) {
    return instance.post('/products/add', params);
  },
  detail(id) {
    return instance.get(`/products/${id}`);
  },
  edit(params) {
    return instance.put('/products/edit', params);
  },
};
