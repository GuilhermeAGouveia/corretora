import { GetStaticProps } from "next";
import styled from "styled-components";
import Button from "../../components/Button";
import { getButtonContent } from '../../lib/content';
import { IButton } from "../../lib/interfaces";



interface HomeProps {
  buttons: IButton[];
}

export default function Home({ buttons }: HomeProps) {
    const handleClick = (message: string) => {
        console.log(message)
      }
  return (
    <HomeRoot>
      {buttons.map(button => (
        <Button key={button.label} label={button.label} onClick={() => handleClick(button.label)}/>
      ))}
       
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

export const getStaticProps: GetStaticProps = async () => {
  const buttons = await getButtonContent();
  return { 
    props: {
      buttons
    }
   };
};

