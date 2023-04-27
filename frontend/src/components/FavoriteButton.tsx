import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AnimatePresence, motion } from "framer-motion";
import { uniqueId } from "lodash";
import { useState } from "react";
import styled from "styled-components";
import colors from "../styles/colors";

interface FavoriteButtonProps {
    isFavorite: boolean;
    handleFavorite: () => void;
    size?: number;
}

export default function FavoriteButton({isFavorite, handleFavorite, size} : FavoriteButtonProps) {
    const [isHover, setIsHover] = useState(false);
    size = size || 25;

    return (
        <FavoriteButtonContainer
        size={size}
        onClick={handleFavorite}
      >
        <AnimatePresence>
          {(isFavorite || isHover) && (
            <IconHeart
              initial={{ width: 0, height: 0 }}
              animate={{ width: size + 5, height: size + 5 }}
              exit={{ width: 0, height: 0 }}
            >
              <FavoriteIcon key={uniqueId()} sx={{
                color: colors.primary,
                fontSize: size,
              }} />
            </IconHeart>
          )}
          <FavoriteBorderIcon 
            key={uniqueId()}
            style={{ position: "absolute" }}
            sx={{
              color: colors.primary,
              fontSize: size,
            }}
          />
        </AnimatePresence>
      </FavoriteButtonContainer>
    )
}



const FavoriteButtonContainer = styled(motion.button)<{ size?: number }>`
  position: relative;
    width: ${({ size }) => (size ? `${size}px` : "40px")};    
    height: ${({ size }) => (size ? `${size}px` : "40px")};
    border: none;
    background: none;
`;


const IconHeart = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
