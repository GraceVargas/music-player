import React, { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";

type Props = {
  children: ReactNode;
};

const SimpleSlider: FC<Props> = ({ children }) => {
  const settings = {
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    lazyLoad: true,
  };

  return (
    <Box overflow="hidden">
      <Slider {...settings}>{children}</Slider>
    </Box>
  );
};

export { SimpleSlider };
