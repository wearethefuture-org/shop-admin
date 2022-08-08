import React, { useEffect, useState } from 'react';
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

const SlidesGallery = ({ customAnimation }) => {
  const slides = useSlides();
  const [effect, setEffect] = useState('');

  useEffect(() => {
    setEffect(customAnimation);
  }, [customAnimation]);

  return (
    <div className={styles.mainswiper}>
      {customAnimation === effect && (
        <Swiper
          effect={customAnimation}
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
              <SwiperSlide className={styles.swiperslide} key={slide.id}>
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
