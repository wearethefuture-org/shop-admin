import { root } from './config';
import axios, { AxiosResponse } from 'axios';
import { ICategoryItem } from '../interfaces/category-Item';
import { ISliderItem } from '../interfaces/slider-item';
import {IActions, IActionsImage} from '../interfaces/actions';
import {strict} from "assert";

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

			// Витягую картинку у форматі File
			const image = slider.image

			//присвоюю пусту строку для запису слайдера в базу
			slider.image = ""

			//Закидуємо слайдер у базу для отримання id, для подальшого завантаження картинки
			const newSliderResponse = await axios.post(`${root}/slider`, slider)
			const newSlider = newSliderResponse.data

			const formData = new FormData()
			formData.append("image", image)
			formData.append("sliderId", newSlider.id)

			//закидуємо картинку для теперішнього слайдер ід ???????????
			const serverImage = await axios.post(`${root}/slider/images`, formData)

			//Записуємо в image коректне посилання на картинку
			newSlider.image = `${root}/slider/img/${serverImage.data.name}`

			//Оновлюємо обєкт слайдер у базі для коректоного запису посилання на image
			return axios.patch(`${root}/slider/${newSlider.id}`, newSlider)
		},
		update: (slider) => axios.patch(`${root}/slider/${slider.id}`, slider),

		delete: (slider) => axios.delete(`${root}/slider/${slider.id}`),
	}

};
