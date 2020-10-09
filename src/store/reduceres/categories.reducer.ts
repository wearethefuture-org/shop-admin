import { IActions } from "../../interfaces/actions";
import { LOAD_CATEGORIES } from "../types";
import { ICategoriesData } from '../../interfaces/categories-data';


const data: ICategoriesData = {
  // list: [
  //   {
  //     id: 1,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары 1",
  //     products: [],
  //   },
  //   {
  //     id: 2,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары 2",
  //     products: [],
  //   },
  //   {
  //     id: 3,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары 3",
  //     products: [],
  //   },
  //   {
  //     id: 4,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары 4",
  //     products: [],
  //   },
  //   {
  //     id: 5,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары 5",
  //     products: [],
  //   },
  //   {
  //     id: 6,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 7,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 8,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 9,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 10,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 11,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 12,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 13,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 14,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 15,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 16,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 17,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 18,
  //     createdAt: "2020-09-30T16:31:52.039Z",
  //     updatedAt: "2020-09-30T16:31:52.039Z",
  //     name: "Детские товары",
  //     products: [],
  //   },
  //   {
  //     id: 19,
  //     createdAt: "2020-09-30T16:31:52.168Z",
  //     updatedAt: "2020-09-30T16:31:52.168Z",
  //     name: "Туры и отдых",
  //     products: [],
  //   },
  //   {
  //     id: 20,
  //     createdAt: "2020-09-30T16:31:52.088Z",
  //     updatedAt: "2020-09-30T16:31:52.088Z",
  //     name: "Канцтовары и книги",
  //     products: [],
  //   },
  //   {
  //     id: 21,
  //     createdAt: "2020-09-30T16:31:52.011Z",
  //     updatedAt: "2020-09-30T16:31:52.011Z",
  //     name: "Красота и здоровье",
  //     products: [],
  //   },
  // ],
};

const categories = (state = data, action: IActions) => {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      return {...state, list: action.data}
    }
    default:
      return state;
  }
};

export default categories;
