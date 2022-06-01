import { api } from '../../../api/api';

export async function apiGetSliderAnimations() {
  const animations = await api.sliderAnimations.getSliderAnimations();
  return animations.data;
}

export async function apiGetActiveSliderAnimation() {
  const animation = await api.sliderAnimations.getActiveSliderAnimation();
  return animation.data;
}

export async function apiChangeActiveSliderAnimation(id: number, isActive: boolean) {
  const animation = await api.sliderAnimations.changeActiveSliderAnimation(id, isActive);
  return animation.data;
}
