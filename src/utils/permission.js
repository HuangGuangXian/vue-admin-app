/**
 * 存储的是 角色对应的权限名称
 */
const roleToRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'AddProduct',
  }, {
    name: 'editProduct',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'AddProduct',
  }, {
    name: 'editProduct',
  }, {
    name: 'Category',
  }],
};

/**
 * 过滤掉没有权限的路由
 * @param {String} role
 * @param {Array} routes
 */
export default function getMenuRoutes(role, routes) {
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
