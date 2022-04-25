import Image from "next/image";
import styled from "styled-components";
import logoPng from "../assets/images/logo.png";

const LogoComponent = () => {
  return <Logo src={logoPng} width={83} height={70} alt="Logo" />;
};

export default LogoComponent;

const Logo = styled(Image)`
  position: relative;
  height: 70px;
  width: 83px;
`;
