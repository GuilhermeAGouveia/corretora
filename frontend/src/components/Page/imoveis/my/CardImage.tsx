import {Image as IImage} from "../../../../lib/interfaces";
import styled from "styled-components";
import colors from "../../../../styles/colors";
import {useState} from "react";
import Image from "next/image";

interface CardImageProps {
    imagesUrl: IImage[];
}

export function CardImage({ imagesUrl }: CardImageProps) {
    const [imageDimensions, setImageDimensions] = useState({
        width: 450,
        height: 450,
    });

    return (
        <CardImageContainer>
            <Image src={
                imagesUrl[0]
                    ? imagesUrl[0].url
                    : "https://picsum.photos/200/300"
            }
                   alt={imagesUrl[0] ? imagesUrl[0].originalname : "Imagem"}
                   style={{
                          objectFit: "cover",
                   }}
                   priority
                   quality={100}

            />
        </CardImageContainer>
    );
}


const CardImageContainer = styled("div")`
  position: relative;
  width: 30%;
  min-width: 100px;
  height: 100%;
  background: ${colors.white};
`;