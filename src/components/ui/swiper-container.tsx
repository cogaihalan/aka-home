"use client";

import React, { forwardRef, ReactNode, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface SwiperContainerSettings {
  hasArrows?: boolean;
  hasDots?: boolean;
  slidesPerView?: number;
  slidesPerGroup?: number;
  duration?: number;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  pauseOnHover?: boolean;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween?: number }>;
  onSlideVisible?: (event: { slide: number }) => void;
}

export interface SwiperContainerProps {
  children: ReactNode;
  settings?: SwiperContainerSettings;
  className?: string;
  slideClassName?: string;
}

const SwiperContainer = forwardRef<SwiperType | null, SwiperContainerProps>(
  ({ children, settings = {}, className, slideClassName }, ref) => {
    const defaultSettings: SwiperContainerSettings = {
      hasArrows: false,
      hasDots: false,
      slidesPerView: 3,
      slidesPerGroup: 1,
      duration: 0.5,
      loop: false,
      autoPlay: false,
      autoPlayDelay: 4000,
      pauseOnHover: true,
      spaceBetween: 12,
    };

    const merged = { ...defaultSettings, ...settings };
    const modules = [A11y];
    if (merged.hasArrows) modules.push(Navigation);
    if (merged.hasDots) modules.push(Pagination);

    const onSlideVisible = settings.onSlideVisible;
    const handleSlideChange = useCallback(
      (swiper: SwiperType) => {
        onSlideVisible?.({ slide: swiper.activeIndex });
      },
      [onSlideVisible],
    );

    const slides = React.Children.toArray(children);

    return (
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => {
            if (ref) {
              if (typeof ref === "function") {
                ref(swiper);
              } else {
                (ref as React.MutableRefObject<SwiperType | null>).current =
                  swiper;
              }
            }
          }}
          modules={modules}
          slidesPerView={merged.slidesPerView}
          slidesPerGroup={merged.slidesPerGroup}
          speed={merged.duration ? merged.duration * 1000 : 500}
          loop={merged.loop}
          spaceBetween={merged.spaceBetween ?? 12}
          breakpoints={merged.breakpoints}
          onSlideChange={handleSlideChange}
          navigation={merged.hasArrows}
          pagination={merged.hasDots ? { clickable: true } : false}
          grabCursor
          className={cn("swiper-container", className)}
          a11y={{
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            paginationBulletMessage: "Go to slide {{index}}",
          }}
        >
          {slides.map((child, index) => (
            <SwiperSlide
              key={index}
              className={cn("swiper-slide", slideClassName)}
            >
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
);

SwiperContainer.displayName = "SwiperContainer";

export { SwiperContainer };
