import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, IconButton } from "@mui/material";
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardHeader from '@mui/material/CardHeader';
import { IProps } from "./IProps";
import { AsteroidContainer, AsteroidParagraph, Bold, CardCustom } from "./styles"
import { checkIfTokenValid, retrieveUserProfile } from 'utils/storage.util';
import { useAppDispatch } from 'state_management/hooks';
import { markFavorite, removeFavorite } from 'state_management/actions/asteroids/asteroids.actions';

const AsteroidCard = ({ asteroid }: IProps) => {
  const user = retrieveUserProfile();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFavoriteClick = () => {
    const tokenValid = checkIfTokenValid();
    if (!tokenValid) return navigate('/login');
    setIsFavorite(!isFavorite);
    if (!isFavorite) return dispatch(markFavorite(parseInt(asteroid.id)));
    if (asteroid?.favorite_id) dispatch(removeFavorite(asteroid.favorite_id));
  };

  useEffect(() => {
    user?.id === asteroid?.user ? setIsFavorite(true) : setIsFavorite(false)
  }, [asteroid]);

  return (
    <AsteroidContainer>
      <Card sx={CardCustom}>
        <CardHeader
          title={asteroid.name}
        />
        <CardContent>
          <AsteroidParagraph>
            Absolute Magnitude: <Bold>{asteroid.absolute_magnitude_h}</Bold>
          </AsteroidParagraph>
          <AsteroidParagraph>
            Potentially hazardous: <Bold>{String(asteroid.is_potentially_hazardous_asteroid)}</Bold>
          </AsteroidParagraph>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">{asteroid.date.split('T')[0]}</Typography>
        </CardContent>
        <CardActions sx={{display:'flex',justifyContent:'space-between'}}>
          <Button size="small" onClick={() => navigate(`/${asteroid.id}`)}>Learn More</Button>
          <IconButton
            title="make favorite"
            aria-label="add to favorites"
            onClick={handleFavoriteClick}
            color={isFavorite ? 'error' : 'default'}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </AsteroidContainer>
  );
};

export default AsteroidCard;
