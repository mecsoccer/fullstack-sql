import styled from 'styled-components';
import { Container } from '@mui/material';

export const HomeContainer = styled(Container)`
  padding-top: 130px;
`;

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(auto, 1fr));
    gap: 20px;
  }
  @media (min-width: 1200px) {
    gap: 40px;
  }
`;
export const NoPostsContainer = styled.div`
  margin-top: 45px;
  text-align: center;
  height: calc(80vh - 130px);
`;
export const NoPostsText = styled.p`
    font-size: 20px;
`
export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
