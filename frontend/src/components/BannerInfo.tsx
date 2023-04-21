import {AnimatePresence, motion, MotionAdvancedProps} from "framer-motion";
import {useEffect, useState} from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import {AlertType} from "../lib/interfaces";

//Icons

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


export interface AlertProps {
    type: AlertType;
    message: string;
}

export interface BannerInfoControl {
    state?: AlertProps; // not undefined = show, undefined = hide
    desactive: () => void; // hide banner
}

interface BannerInfoProps {
    control: BannerInfoControl;
}

const BannerInfo = ({control}: BannerInfoProps) => {
    useEffect(() => {
        setTimeout(() => {
            control.desactive();
        }, 3000);
    }, [control]);

    const AlertIcons = {
        [AlertType.SUCCESS]: CheckCircleOutlineIcon,
        [AlertType.ERROR]: ErrorOutlineIcon,
        [AlertType.WARNING]: ErrorOutlineIcon,
    }

    const AlertIcon = AlertIcons[control.state?.type || "warning"];

    return (
        <AnimatePresence>
            {control.state && (
                <BannerInfoContainer
                    type={control.state.type}
                    initial={{opacity: 0, x: -300}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -300}}
                >
                    <IconeBanner>
                        <AlertIcon sx={{
                            color: "white",
                            fontSize: 20,
                        }}/>
                    </IconeBanner>
                    {control.state.message}
                </BannerInfoContainer>
            )}
        </AnimatePresence>
    );
};

export default BannerInfo;


export const useBannerInfo = () => {
    const alertState = useState<AlertProps>();

    const [alert, setAlert] = alertState;

    return {
        setMessage: (message: string, type: AlertType) => setAlert({message, type}),
        control: {
            state: alert,
            desactive: () => setAlert(undefined),
        }
    }
}

const BannerInfoContainer = styled(motion.div)<{ type: "success" | "error" | "warning"; } & MotionAdvancedProps>`
  position: fixed;
  z-index: 999;
  display: flex;
  align-items: center;
  bottom: 5px;
  left: 5px;
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