import React, { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";

type Props = {
  children: ReactNode;
};

const SimpleSlider: FC<Props> = ({ children }) => {
  const settings = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 4,
    arrows: true,
    dots: false,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      <Slider {...settings}>{children}</Slider>
    </Box>
  );
};

export { SimpleSlider };
