import Image from "next/image";
import styled from "styled-components";
import logoPng from "../../../assets/images/logo.png";
import Button from "../../../components/Button";
import SlideBanner from "../../../components/SlideBanner";
import colors from "../../../styles/colors";

const Header = () => {
    return (
      <HeaderContainer>
          <HeaderTop>
            <Button label={"Login"}></Button>
            <Logo src={logoPng} alt="Logo" />
            <Button label={"Cadastrar"}></Button>
          </HeaderTop>
          <HeaderContent>
              <CompanyName>BlueHome</CompanyName>
              <CompanyBanner>
                  <CompanyBannerText>Aqui vc</CompanyBannerText>
                  <CompanySlideBanner width={200}></CompanySlideBanner>
              </CompanyBanner>

          </HeaderContent>
          
                    

      </HeaderContainer>

    )
}

export default Header;

const HeaderContainer = styled.header`
    position: relative;
    height: 100vh;
    width: 100%;
    background-color: ${colors.secondary};
`

const HeaderTop = styled.div`
    position: relative;
    height: 52px;
    margin: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Logo = styled(Image)`
    position: relative;
    height: 70px;
    width: 83px;
`

const HeaderContent = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`

const CompanyName = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    font-family: 'Montserrat', sans-serif;
    color: ${colors.gray};
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
`

const CompanyBanner = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CompanyBannerText = styled.div`
    position: relative;
    width: 40%;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    color: #A9A9A9;
    font-weight: 300;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const CompanySlideBanner = styled(SlideBanner)`
    position: relative;
    width: 168px;
    height: 63%;
`
