import styled from "styled-components"

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
`