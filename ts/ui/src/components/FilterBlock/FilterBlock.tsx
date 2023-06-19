import { useState, useEffect, SyntheticEvent } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Button, Grid, Stack } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Div, FilterBlockContainer, FlexStyle, XsRowSpace } from "./styles";
import { useAppDispatch } from 'state_management/hooks';
import { getAllAsteroids, getAllFavorites } from 'state_management/actions/asteroids/asteroids.actions';
import { checkIfTokenValid } from 'utils/storage.util';
import { useNavigate } from 'react-router-dom';

const FilterBlock = () => {
  const newDate = new Date();
  const today = newDate.toJSON().slice(0, 10);
  newDate.setDate(newDate.getDate() - 1);
  const ystDay = newDate.toJSON().slice(0, 10);


  const [sort, setSort] = useState('default');
  const [dateSort, setDateSort] = useState({ from: ystDay, to: today });
  const [nameSort, setNameSort] = useState('');
  const [initial, setInitial] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSortChange = (_: SyntheticEvent, value: string | null) => {
    value ? setSort(value) : setSort('default')
  };

  const handleDateSort = (field: string, value: string) => {
    setDateSort({ ...dateSort, [field]: value });
  };

  const submitDateSort = () => {
    setInitial(false);
    const { from, to } = dateSort;
    const params = { date_from: from, date_to: to };
    dispatch(getAllAsteroids(undefined, undefined, params))
  };

  const submitNameSort = () => {
    setInitial(false);
    dispatch(getAllAsteroids(undefined, undefined, { name: nameSort }))
  }

  const onViewFavoritesClick = () => {
    const tokenValid = checkIfTokenValid();
    if (!tokenValid) return navigate('/login');
    setInitial(false);
    dispatch(getAllFavorites());
  }

  useEffect(() => {
    if (sort === 'default' && !initial) dispatch(getAllAsteroids());
  }, [sort]);

  return (
    <FilterBlockContainer>
      <Container>
        <Grid sx={FlexStyle}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['default', 'date', 'name']}
            renderInput={(params) => <TextField {...params} label="Sort by" />}
            value={sort}
            onChange={handleSortChange}
            size="small"
            sx={{ width: 250}}
          />
          <XsRowSpace>
            <Button color="error" onClick={onViewFavoritesClick}>View Favorites</Button>
          </XsRowSpace>
        </Grid>
      </Container>
      {sort === 'date' && (
        <Div>
          <Paper
            component="form"
            sx={{ p: '2px 4px', padding: '10px 5px', display: 'flex', alignItems: 'center', maxWidth: 450 }}
          >
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap >
              <TextField
                label="from"
                id="outlined-size-small"
                size="small"
                type='date'
                value={dateSort.from}
                onChange={(e) => handleDateSort('from', e.target.value)}
              />
              <TextField
                label="to"
                id="outlined-size-small"
                size="small"
                type='date'
                value={dateSort.to}
                onChange={(e) => handleDateSort('to', e.target.value)}
              />
              <Button size="small" onClick={submitDateSort}>send</Button>
            </Stack>
          </Paper>
        </Div>
      )}
      {sort === 'name' && (
        <Div>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 450 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter a name"
              inputProps={{ 'aria-label': 'search google maps' }}
              value={nameSort}
              onChange={(e) => setNameSort(e.target.value)}
            />
            <IconButton onClick={submitNameSort} type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Div>
      )}
    </FilterBlockContainer>
  )
};

export default FilterBlock;
