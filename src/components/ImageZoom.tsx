// ImageZoom.tsx
import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";

interface ImageZoomProps {
  src: string;
  alt: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt }) => {
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const imageElement = e.currentTarget;
    const { left, top, width, height } = imageElement.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setZoomStyle({
      backgroundImage: `url(${src})`,
      backgroundSize: `${width * 2}px ${height * 2}px`,
      backgroundPosition: `${(x / width) * 100}% ${(y / height) * 100}%`,
      backgroundRepeat: "no-repeat",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  return (
    <Box mb={4} display="flex" justifyContent="center" position="relative">
      <Image
        src={src}
        alt={alt}
        maxWidth="100%"
        maxHeight="500px"
        objectFit="contain"
        borderRadius="md"
        boxShadow="lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        cursor="zoom-in"
      />
      {zoomStyle.backgroundImage && (
        <Box
          style={zoomStyle}
          borderRadius="md"
          boxShadow="lg"
          display="block"
          width="300px"
          height="300px"
          position="absolute"
          top="50px"
          left="50px"
          zIndex="10"
          pointerEvents="none"
        />
      )}
    </Box>
  );
};

export default ImageZoom;