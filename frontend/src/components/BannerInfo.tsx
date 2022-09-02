import {AnimatePresence, motion, MotionAdvancedProps} from "framer-motion";
import {useEffect, useState} from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import {FiAlertCircle, FiCheckCircle, FiXCircle} from "react-icons/fi";
import {AlertType} from "../lib/interfaces";

export interface BannerInfoControl {
    state: boolean; // true = show, false = hide
    desactive: () => void; // hide banner
}

interface BannerInfoProps {
    children: any;
    type: AlertType;
    control: BannerInfoControl;
}

const BannerInfo = ({type, children, control}: BannerInfoProps) => {

    type = type || AlertType.SUCCESS;
    children = children || "Sem mensagem";

    useEffect(() => {
        setTimeout(() => {
            control.desactive();
        }, 3000);
    }, []);

    const AlertIcons = {
        [AlertType.SUCCESS]: FiCheckCircle,
        [AlertType.ERROR]: FiXCircle,
        [AlertType.WARNING]: FiAlertCircle,
    }

    const AlertIcon = AlertIcons[type];

    return (
        <AnimatePresence>
            {control.state && (
                <BannerInfoContainer
                    type={type}
                    initial={{opacity: 0, x: 300}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 300}}
                >
                    <IconeBanner>
                        <AlertIcon color={"white"} size={20}/>
                    </IconeBanner>
                    {children}
                </BannerInfoContainer>
            )}
        </AnimatePresence>
    );
};

export default BannerInfo;

export const useBannerInfo = () => {
    const alertState = useState<{
        type: AlertType;
        message: string;
    }>();

    const [alert, setAlert] = alertState;

    return {
        alertState,
        control: {
            state: !!alert,
            desactive: () => setAlert(undefined),
        }
    }
}

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