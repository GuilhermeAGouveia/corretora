import { useRouter } from "next/router";
import { useState } from "react";
import styled, { css } from "styled-components";
import useDeviceDetect from "../hooks/useDeviceDetect";
import colors from "../styles/colors";
import Button from "./Button";
import Logo from "./Logo";

export default function MainBar() {
  const router = useRouter();
  const [labelButton, setLabelButton] = useState("Teste");
  const { isMobileView } = useDeviceDetect();

  return (
    <HeaderTop isMobileView={isMobileView}>
      <Button label={"Login"} onClick={() => router.push("/login")}></Button>
      <Logo />
      <Button
        label={labelButton}
        onClick={() => {
          router.push("/imovel/cl27u669x0007mjly3n30dvn3");
          setLabelButton("Loading...");
        }}
      ></Button>
    </HeaderTop>
  );
}

const deviceStyles = {
  mobile: css`
    position: fixed;
    bottom: 0;
    margin: 10px;
    border-radius: 5px;
    background: ${colors.tertiary};
  `,
  desktop: css`
    position: relative;
    margin: 0px 10px;
  `,
};

const HeaderTop = styled.div<{ isMobileView: boolean }>`
  ${({ isMobileView }) => deviceStyles[isMobileView ? "mobile" : "desktop"]}
  
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
