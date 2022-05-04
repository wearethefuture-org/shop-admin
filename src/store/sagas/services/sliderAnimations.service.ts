import { api } from '../../../api/api';

export async function apiGetSliderAnimations() {
  const animations = await api.sliderAnimations.getSliderAnimations();
  return animations.data;
}

export async function apiGetActiveSliderAnimation() {
  const animation = await api.sliderAnimations.getActiveSliderAnimation();
  return animation.data;
}

export async function apiSetActiveSliderAnimation(id: number) {
  const animation = await api.sliderAnimations.setActiveSliderAnimation(id);
  return animation.data;
}

export async function apiSetInactiveSliderAnimation(id: number) {
  const animation = await api.sliderAnimations.setInactiveSliderAnimation(id);
  return animation.data;
}
