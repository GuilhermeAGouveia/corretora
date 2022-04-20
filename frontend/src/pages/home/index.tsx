import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../../components/Button";

export default function Home() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <HomeRoot>
      <Button onClick={handleBack} label="voltar" />
    </HomeRoot>
  );
}

const HomeRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
