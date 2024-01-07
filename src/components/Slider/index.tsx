import React, { FC, ReactNode, useState } from "react";
import { Box, Button } from "@mui/material";
import Slider from "react-slick";

type Props = {
  children: ReactNode;
  length: number;
};

const SimpleSlider: FC<Props> = ({ children, length }) => {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const settings = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    dots: false,
    lazyLoad: true,
    afterChange: (currentSlide: number) => {
      setIsLastSlide(currentSlide + 6 >= length);
    },
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
    <Box position={"relative"}>
      <Slider {...settings}>{children}</Slider>
      {isLastSlide && (
        <Button sx={{ position: "absolute", right: 0, color: "#6674f1" }}>
          View All
        </Button>
      )}
    </Box>
  );
};

export { SimpleSlider };
