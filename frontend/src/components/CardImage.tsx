import Image from 'next/image';
import { useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import loadingData from "../assets/lotties/loading.json";
import colors from "../styles/colors";


interface CardImageProps {
    imageUrl: string;
    onClick?: () => void;
    alt: string;
}

const CardImage = ({imageUrl, alt, onClick}: CardImageProps) => {
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [imageDimensions, setImageDimensions] = useState({
      width: 450,
      height: 450,
    });
    return (
        <CardImovelImage onClick={onClick}>
        <Image
          src={imageUrl}
          alt={alt}
          {...imageDimensions}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoadingComplete={({
            naturalHeight: height,
            naturalWidth: width,
          }) => {
            let newWidth = 250 / width;
            let newHeight = height * newWidth;
            if (newHeight < 250) newHeight = 250;
            if (newHeight > 450) newHeight = 450;
            setImageDimensions({ width: 250, height: newHeight });
            setIsLoadingImage(false);
          }}
          quality={100}
        />
        {isLoadingImage && (
          <ImagePlaceholder>
            <Lottie
              options={{
                loop: true,
                autoplay: true,

                animationData: loadingData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              width={100}
              height={100}
            />
          </ImagePlaceholder>
        )}
      </CardImovelImage>
    )
}
export default CardImage

const CardImovelImage = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

export const ImagePlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

