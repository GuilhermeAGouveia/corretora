import Image from "next/image";
import styled from "styled-components";
import logoPng from "../assets/images/logo.png";

const LogoComponent = () => {
  return <Logo src={logoPng} width={83} height={70} alt="Logo empresa"/>;
};

export default LogoComponent;

const Logo = styled(Image)`
  position: relative;
`;
