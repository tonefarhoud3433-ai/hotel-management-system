import { Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropertyCard from './card'
import { Box, Typography } from '@mui/material'

export interface CardData {
    imagePath: string,
    title: string,
    subTitle: string
}

interface SwiperProps {
    cards: CardData[],
    title: string
}
export default function StaticSwiper({ cards, title }: SwiperProps) {
    return (
        <Box sx={{
            px: 2,
            width: '90%',
            mx: 'auto',
            my:4
        }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Typography>
            <Swiper
                modules={[Keyboard]}

                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                spaceBetween={8}
                loop={true}
                // autoplay={{
                //     delay: 0,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: true,
                //     waitForTransition: true,
                // }}

                grabCursor={true}
                allowTouchMove={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                speed={500}

            >
                {cards.map(card => (

                    <SwiperSlide><PropertyCard card={card} />
                    </SwiperSlide>
                )

                )}


            </Swiper>
        </Box>

    )
}
