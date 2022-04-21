import { ButtonHTMLAttributes } from 'react';
import styled from "styled-components";
import colors from '../styles/colors';

interface ButtonProps extends ButtonHTMLAttributes<any> {
    label: string;
}
    

export default function Button({label, onClick, ...rest} : ButtonProps) {
    return (
        <ButtonRoot onClick={onClick} {...rest}>
            <ButtonText>{label}</ButtonText>
            <ButtonBg /> 
        </ButtonRoot>
    )
}

const ButtonRoot = styled.button`
    position: relative;
    height: 36px;
    width: 94px;

    background: none;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

`

const ButtonBg = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${colors.tertiary};
    opacity: 0.2;
`

const ButtonText = styled.div`
    position: relative;
    color: ${colors.primary};
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 500;
`