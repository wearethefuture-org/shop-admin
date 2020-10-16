import {root} from '../../../api/config';

export async function fetchedCategories () {
   const response = await fetch(`${root}/category`);
   return await response.json();
}