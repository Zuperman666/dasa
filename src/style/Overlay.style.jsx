import styled from "styled-components";

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: auto;
    backdrop-filter: blur(6px);
    height: 100vh;
    width: 100%;
    @media screen  and (min-width: 575px) {
        display: none;
    }
`