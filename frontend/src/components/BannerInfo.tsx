import {AnimatePresence, motion, MotionAdvancedProps} from "framer-motion";
import {useEffect, useState} from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import {FiAlertCircle, FiCheckCircle, FiXCircle} from "react-icons/fi";

interface BannerInfoProps {
    children: any;
    type: "success" | "error" | "warning";
}

const BannerInfo = ({type, children}: BannerInfoProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <BannerInfoContainer
                    type={type}
                    initial={{opacity: 0, x: 300}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 300}}
                >
                    <IconeBanner>
                        {type === "success" && (
                            <FiCheckCircle color={"white"} size={20}/>
                        )}
                        {type === "error" && (
                            <FiXCircle color={"white"} size={20}/>
                        )}
                        {type === "warning" && (
                            <FiAlertCircle color={"white"} size={20}/>
                        )}

                    </IconeBanner>
                    {children}
                </BannerInfoContainer>
            )}
        </AnimatePresence>
    );
};

export default BannerInfo;


const BannerInfoContainer = styled(motion.div)<{ type: "success" | "error" | "warning"; } & MotionAdvancedProps>`
  position: fixed;
  z-index: 999;
  display: flex;
  align-items: center;
  top: 5px;
  right: 5px;
  padding: 10px 5px;
  border-radius: 3px;
  max-width: 250px;
  color: white;
  font-size: 14px;
  background-color: ${(props) => colors.info[props.type]};
`;

const IconeBanner = styled.div`
  position: relative;
  margin-right: 5px;
  height: 100%;
  display: flex;
  align-items: center;
`;