import styled from "styled-components";

export const FooterWrapper = styled.footer`
    width: 100vw;
    height: 14rem;
    background-color: white;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.7);
    

    .social-media {
        display: flex;
        height: 50%;
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid black;
        a {
            color: black;

            svg {
                width: 1.5rem;
                height: 1.5rem;
            }
        }
    }

    .copywrite-links {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 2rem;
        height: 50%;

        .copywrite-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-right: 1.5px solid black;
            font-size: small;
            padding-right: 10px;
        }

        .footer-links {
            ul {
                display: flex;
                gap: 2rem;

                li {
                    font-size: smaller;
                    list-style: circle;
                }
            }
        }
    }

    // Media query for smaller screens
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        height: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        .social-media {
            flex-direction: column;
            height: auto;
            gap: 0.5rem;
            border-bottom: none;
            display: flex;
            flex-direction: row;

            a{
              width: max-content;
            }
        }

        .copywrite-links {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
            height: auto;
            justify-content: center;
            align-items: center;
            
            .copywrite-container {
              border-right: none;
              padding-right: 0;
            }
            
            .footer-links {
              ul {
                /* flex-direction: column; */
                justify-content: center;
                align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    align-items: flex-start;
                }
            }
        }
    }
`;
