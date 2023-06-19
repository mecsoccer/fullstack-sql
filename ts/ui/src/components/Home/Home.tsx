import { ChangeEvent } from 'react';
import AsteroidCard from "../AsteroidCard/AsteroidCard";
import Pagination from '@mui/material/Pagination';
import { IProps } from "./IProps";
import { GridContainer, HomeContainer, NoPostsContainer, NoPostsText, PaginationWrapper } from "./styles"
import FilterBlock from "../FilterBlock/FilterBlock";
import { getAllAsteroids } from "state_management/actions/asteroids/asteroids.actions";
import { useAppDispatch } from 'state_management/hooks';

const Home = ({ asteroids }: IProps) => {
  const dispatch = useAppDispatch();

  const updatePagination = (e: ChangeEvent<unknown>, page: number) => {
    dispatch(getAllAsteroids(20, (page - 1) * 20));
  };

  const renderNotFound = () => {
    return (
      <NoPostsContainer >
        <NoPostsText>No Asteroids were found</NoPostsText>
      </NoPostsContainer>
    );
  }

  const renderPostGrid = () => {
    return (
      <GridContainer>
        {asteroids.map((ast, idx) => (
          <AsteroidCard key={idx} asteroid={ast} />
        ))}
      </GridContainer>
    );
  };

  return (
    <HomeContainer data-testid="asteroid-test-id">
      <FilterBlock />
      {!asteroids || asteroids?.length === 0
        ? renderNotFound()
        : renderPostGrid()
      }
      <PaginationWrapper>
        <Pagination onChange={updatePagination} count={20} variant="outlined" shape="rounded" />
      </PaginationWrapper>
    </HomeContainer>
  );
};

export default Home;
