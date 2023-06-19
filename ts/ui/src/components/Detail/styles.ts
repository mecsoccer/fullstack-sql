import styled from 'styled-components';
import { Container } from '@mui/material';

export const HomeContainer = styled(Container)`
  padding-top: 130px;
  padding-bottom: 50px;
`;

export const AsteroidContainer = styled.div`
  width: 100%;
  background-color: #f3f3f3;
  padding: 20px;
  @media (min-width: 768px) {
    padding: 50px
  }
`;

export const AsteroidName = styled.h2`

`;

export const AsteroidParagraph = styled.p`

`;

export const Bold = styled.b`

`;

export const AccordionTopMargin = {
  marginTop: '20px'
};