import { Box } from "@chakra-ui/react";
import Slider from "react-slick";

// Dynamically import all images from the 'slider-images' folder
const images: { [key: string]: string } = import.meta.glob('../assets/slider-images/*.{jpg,jpeg,webp}', { eager: true });

const CustomSlider = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loops
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto scroll slides
    autoplaySpeed: 7000, // Slide change interval in ms
    arrows: false, // Hide default arrows
    responsive: [
      {
        breakpoint: 768, // For tablet and mobile
        settings: {
          slidesToShow: 1, // Show one slide
          dots: true, // Keep dots for navigation
        },
      },
    ],
  };

  // Convert the `import.meta.glob` result to an array of image URLs
  const imageArray = Object.values(images) as string[];

  return (
    <Box mb={6}>
      <Slider {...settings}>
        {imageArray.map((image, index) => (
          <Box key={index}>
            <img
              src={image}
              alt={`Slider ${index + 1}`}
              style={{
                width: "100%",
                height: "auto", // Make the height auto for responsiveness
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
