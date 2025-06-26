import React from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = ({ title, items }) => (
  <div className="carousel-section">
    <h3 className="carousel-title">{title}</h3>
    <Swiper
      modules={[Pagination, Mousewheel, FreeMode]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => `<span class="${className} custom-bullet"></span>`,
      }}
      mousewheel={{
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true,
      }}
      freeMode={{
        enabled: true,
        sticky: true,
      }}
      grabCursor={true}
      className="carousel-swiper"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="carousel-item">
            <h4 className="carousel-item-title">
              {item.icon} {item.title}
            </h4>
            <p className="carousel-item-description">{item.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Carousel;
