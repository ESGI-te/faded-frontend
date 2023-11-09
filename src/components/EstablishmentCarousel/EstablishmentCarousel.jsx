import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import styled from 'styled-components';

const EstablishmentCarousel = ({ images }) => {
    return (
        <Slider
            slidesPerView={1.5}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            spaceBetween={0}
            modules={[Pagination, Navigation]}
            navigation={{ enabled: true }}
            loop={true}
        >
            {images?.map((image) => (
                <Slide key={image.id}>{<Img src={image.download_url} alt={image.title} />}</Slide>
            ))}
        </Slider>
    );
};

const Slider = styled(Swiper)`
    width: 100%;
    height: 300px;

    .swiper-button-prev::after,
    .swiper-button-next::after {
        font-size: 2rem;
        color: var(--white);
    }

    .swiper-pagination-bullet {
        background: var(--white);
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        border-radius: var(--r-s);
        height: 380px;
    }
`;
const Slide = styled(SwiperSlide)``;
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default EstablishmentCarousel;
