import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  EffectFlip,
  EffectFade,
  EffectCoverflow,
  EffectCube,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { root } from '../../api/config';
import useSlides from '../../hooks/useSlides';
import { RootState } from '../../store/store';
import styles from './SlidesGallery.module.scss';

SwiperCore.use([
  Autoplay,
  Pagination,
  Navigation,
  EffectFlip,
  EffectFade,
  EffectCoverflow,
  EffectCube,
]);

const SlidesGallery = () => {
  const slides = useSlides();
  const animationsData = useSelector((state: RootState) => state.sliderAnimations);
  const [effect, setEffect] = useState('');

  useEffect(() => {
    setEffect(animationsData.animation);
  }, [animationsData.animation]);

  return (
    <div className={styles.mainswiper}>
      {animationsData.animation === effect && (
        <Swiper
          effect={animationsData.animation}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={5}
          slidesPerView={1}
          pagination={true}
          loop
          className={styles.swiper}
        >
          {slides.data?.map((slide) => {
            return (
              <SwiperSlide className={styles.swiperslide}>
                <img src={`${root}/static/uploads/${slide.image}`} alt={slide.name} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default SlidesGallery;
