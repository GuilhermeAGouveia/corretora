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
export const SearchSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
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
  width: 280px;
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

export const AnounceSection = styled.div`
  position: fixed;
  width: 100%;
  height: auto;
  padding: 10px;
  `;

export const AnounceContent = styled.div`
  position: relative;
  width: 100%;
  height: auto;


  `;

export const AnounceTitle = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 500;
  margin: 20px;
  color: rgba(0, 0, 0, 0.8);
`;

export const AnounceButton = styled.button`
  position: relative;
  width: 90%;
  max-width: 300px;
  margin: 5px auto;
  height: 50px;
  border: none;
  display: flex;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  align-items: center;
  color: ${colors.primary};

  `;

export const AnnounceLineDivision = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 10px auto;
`;

export const ListContainer = styled.div<{isMobile: boolean}>`
  position: relative;
  width: 100%;
  height: auto;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;

  ${props => props.isMobile && `
    padding-bottom: 55px;
  `}
`;

export const LoadingBottomContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;