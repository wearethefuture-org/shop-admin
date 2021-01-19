import { root } from './config';
import axios, { AxiosResponse } from 'axios';
import { ICategoryItem } from '../interfaces/category-Item';
import { ISliderItem } from '../interfaces/slider-item';
import {IActions, IActionsImage} from '../interfaces/actions';

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
	categories: {
		get: () => FetchedDataType<ICategoryItem>;
		add: (category: IActions) => FetchedDataType<ICategoryItem>;
	},

	sliders: {
		get: () => FetchedDataType<ISliderItem>;
		add: (slider: IActionsImage ) => FetchedDataType<ISliderItem>;
		update: (slider: IActionsImage) => FetchedDataType<ISliderItem>;
		delete: (slider: IActionsImage) => FetchedDataType<ISliderItem>;
	}

};

export const api: ApiFetchedDataType = {
	categories: {
		get: () => axios.get(`${root}/category`),
		add: (category) => axios.post(`${root}/category`, category),
	},

	sliders: {
		get: () => axios.get(`${root}/slider`),
		add: async (slider) => {


			if(slider.image instanceof File){
				const formData = new FormData()
				formData.append("image", slider.image)

				//закидуємо картинку
				const serverImage = await axios.post(`${root}/slider/images`, formData)

				//Записуємо в поле image коректне посилання на картинку
				slider.image = `${root}/slider/img/${serverImage.data.name}`
			}


			//Зберігаємо обєкт слайдер у базі
			return axios.post(`${root}/slider`, slider)
		},
		update: async (slider) => {

			if(slider.image instanceof File){
				const formData = new FormData()
				formData.append("image", slider.image)

				//закидуємо картинку
				const serverImage = await axios.post(`${root}/slider/images`, formData)

				//Записуємо в поле image коректне посилання на картинку
				slider.image = `${root}/slider/img/${serverImage.data.name}`
			}

			//Зберігаємо обєкт слайдер у базі
			return axios.patch(`${root}/slider/${slider.id}`, slider)

		},

		delete: (slider) => axios.delete(`${root}/slider/${slider.id}`),
	}

};
