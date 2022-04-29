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
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    // remove blue background on click in mobile browsers

    *:focus {
        outline: 0 !important;
    }

    * {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

 
button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
}

button::before {
    display: none;
    content: '';
    position: absolute;
    animation: button-hover-desktop 1s forwards;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    background: white;
    opacity: 0.15;
}

button:hover::before {
    display: block;
}

@media only screen and (max-width:500px) {
    button::before {
        animation: button-hover-mobile 1.2s forwards;
    }
}

@media only screen and (max-height:500px) {
    button::before {
        animation: button-hover-mobile 1.2s forwards;
    }
}

@keyframes button-hover-desktop {
    from {
        width: 0px;
        height: 0px;
    }
    to {
        height: 3000px;
        width: 3000px;
    }
}

@keyframes button-hover-mobile {
    from {
        width: 0px;
        height: 0px;
    }
    to {
        height: 500px;
        width: 500px;
        opacity: 0;
    }
}

    // remove arrows right from input type number
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }

`;

export default GlobalStyle;
