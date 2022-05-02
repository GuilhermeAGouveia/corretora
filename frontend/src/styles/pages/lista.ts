import styled from "styled-components";
import colors from "../colors";

export const ListRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: ${colors.white};

  

  /**
    As duas linhas acima forçam o scroll neste elemento ao invés de ocorrer no body,
    assim eu consigo determinar o scroll máximo da página que é o scroll do elemento
   */
`;
export const SectionImoveis = styled.section`
  position: relative;
  width: 100%;
  min-height: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
export const LeftSection = styled.div`
  position: relative;
  width: 210px;
  height: auto;
  padding: 10px;
  display: block;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    width: 100%;
  }
`;
export const SearchInfo = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px;
  display: block;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
export const SearchTotal = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  font-family: "Poppins", sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;
