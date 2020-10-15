import { root } from '../../../api/config';

export async function fetchedProducts() {
  const response = await fetch(`${root}/product`);
  return await response.json();
}