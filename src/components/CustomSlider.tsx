import { Box } from "@chakra-ui/react";
import Slider from "react-slick";

// Import images
import Slider1 from "../assets/slider-images/slider1.jpg";
import Slider2 from "../assets/slider-images/Slider2.jpeg";
import Slider3 from "../assets/slider-images/j-slider.webp";

const CustomSlider = () => {
  const images = [Slider1, Slider2, Slider3];

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto scroll slides
    autoplaySpeed: 7000, // Slide change interval in ms
    arrows: false, // Hide default arrows
  };

  return (
    <Box mb={6}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <img
              src={image}
              alt={`Slider ${index + 1}`}
              style={{
                width: "100%",
                height: "650px",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CustomSlider;
