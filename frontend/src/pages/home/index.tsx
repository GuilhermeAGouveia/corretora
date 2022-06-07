import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "../../components/Page/home/Header";

export default function Home() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <HomeContainer>
      <Header/>
      
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
