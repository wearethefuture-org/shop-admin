export const haveUserOrders = (orders, user) => {
  return orders.filter((order)=> order.user.id === user.id)
};