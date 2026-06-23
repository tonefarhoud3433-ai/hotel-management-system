import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./card";
import { Box, Typography } from "@mui/material";
import "swiper/css";

export interface CardData {
  imagePath: string;
  title: string;
  subTitle: string;
}

interface SwiperProps {
  cards: CardData[];
  title: string;
}
export default function StaticSwiper({ cards, title }: SwiperProps) {
  return (
    <Box sx={{ px: 2, width: "90%", mx: "auto", my: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Swiper
        modules={[Autoplay, Keyboard]}
        keyboard={{ enabled: true, onlyInViewport: true }}
        spaceBetween={20}
        loop={true}
        // 2. عدّل الـ autoplay هنا
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
        speed={5000} // زيادة السرعة قليلاً لجعل الحركة أنعم
      >
        {cards.map((card, index) => (
          // 3. أضف key فريد لكل شريحة
          <SwiperSlide key={index}>
            <PropertyCard card={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
