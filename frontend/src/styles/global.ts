import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
    body {
        position: relative;
        height: 100%;
        min-height: 100vh;
        width: 100%;
    }

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }

    button {
        cursor: pointer;
    }

`

export default GlobalStyle
