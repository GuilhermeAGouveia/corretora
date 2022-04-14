import { ButtonHTMLAttributes } from 'react';
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<any> {
    label: string;
}
    

export default function Button({label, onClick, ...rest} : ButtonProps) {
    return (
        <ButtonRoot onClick={onClick} {...rest}>
            {label}
        </ButtonRoot>
    )
}

const ButtonRoot = styled.button`
    height: 40px;
    width: 100px;
    border: 1px solid #2e21e7;
    background-color: #4f44f0;
    color: white;
    font-weight: 600;
    font-family: 'MontSerrat', sans-serif;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
    `