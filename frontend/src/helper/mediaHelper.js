import { css } from "styled-components";

export const media = (breakpoint) => (...args) => css`
  @media ${({ theme }) => theme.media[breakpoint]} {
    ${css(...args)};
  }
`;
