import styled from "styled-components";
import colors from "../../../../styles/colors";

export const ActionContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px;
  padding-top: 0;
`;

export const ActionContent = styled.form`
  position: relative;
  width: 100%;
  height: auto;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
`;
export const ActionItem = styled.div`
  position: relative;
  width: 100%;
  max-width: 150px;
  margin-bottom: 20px;
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }
`;
export const ActionLabel = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  font-size: medium;
`;
export const ActionButton = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background: ${colors.primary};
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  border: none;
`;
