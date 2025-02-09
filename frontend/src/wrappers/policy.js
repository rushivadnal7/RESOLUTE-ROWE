import styled from "styled-components"


export const PolicyWrapper = styled.section`
    width: 100vw;
    height: max-content;
    margin-top: 5.5rem;
    text-align: center;


    h1{
        font-size: 2.5rem;
        font-weight: 600;
        color: black;
        margin-top: 8rem;
    }
    p{
        text-align: justify;
        width: 50%;
        margin: 2rem auto;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        h1 {
            font-size: 1.5rem;
        }
        p{
            width: 70%;
        }
    }

`