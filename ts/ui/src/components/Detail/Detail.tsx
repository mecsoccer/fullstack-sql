import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionTopMargin,
  AsteroidContainer,
  AsteroidName,
  AsteroidParagraph,
  Bold,
  HomeContainer
} from "./styles";
import { useAppDispatch, useAppSelector } from 'state_management/hooks';
import { getAsteroidById } from 'state_management/actions/asteroids/asteroids.actions';

type EstimatedDiameters = 'kilometers' | 'meters' | 'miles' | 'feet';

const Detail = () => {
  const { id } = useParams();
  const { selectedAsteroid } = useAppSelector(state => state.asteroids);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getAsteroidById(id));
    }
  }, []);

  return (
    <HomeContainer>
      <AsteroidContainer>
        <AsteroidName>{selectedAsteroid?.name}</AsteroidName>
        <AsteroidParagraph>name: {selectedAsteroid?.name}</AsteroidParagraph>
        <AsteroidParagraph>absolute magnitude: <Bold>{selectedAsteroid?.absolute_magnitude_h}</Bold></AsteroidParagraph>
        <AsteroidParagraph>potentially hazardous: <Bold>
          {String(selectedAsteroid?.is_potentially_hazardous_asteroid)}</Bold>
        </AsteroidParagraph>
        <AsteroidParagraph>sentry object: <Bold>{String(selectedAsteroid?.is_sentry_object)}</Bold></AsteroidParagraph>

        <Accordion defaultExpanded>
          <AccordionSummary id="estimated-diameter" expandIcon={<ExpandMoreIcon />}>
            <Typography>Estimated Diameters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {selectedAsteroid?.estimated_diameter &&
            Object.keys(selectedAsteroid.estimated_diameter).map((item, idx) => (
              <Accordion key={idx}>
                <AccordionSummary id={item} expandIcon={<ExpandMoreIcon />}>
                  <Typography>{item}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AsteroidParagraph>
                    minimum estimated diameter: <Bold>
                      {selectedAsteroid.estimated_diameter[item as EstimatedDiameters].estimated_diameter_min}
                    </Bold>
                  </AsteroidParagraph>
                  <AsteroidParagraph>
                    maximum estimated diameter: <Bold>
                      {selectedAsteroid.estimated_diameter[item as EstimatedDiameters].estimated_diameter_max}
                    </Bold>
                  </AsteroidParagraph>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={AccordionTopMargin} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Close Approach Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {selectedAsteroid?.close_approach_data.map((item, idx) => (
              <React.Fragment key={idx}>
                <AsteroidParagraph>
                  close approach date: <Bold>{item.close_approach_date}</Bold>
                </AsteroidParagraph>
                <AsteroidParagraph>
                  close approach full date: <Bold>{item.close_approach_date_full}</Bold>
                </AsteroidParagraph>
                <AsteroidParagraph>
                  epoch date close approach: <Bold>{item.epoch_date_close_approach}</Bold>
                </AsteroidParagraph>
                <AsteroidParagraph>
                  orbiting body: <Bold>{item.orbiting_body}</Bold>
                </AsteroidParagraph>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Relative Velocity</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AsteroidParagraph>
                      kilometers per second: <Bold>{item.relative_velocity.kilometers_per_second}</Bold>
                    </AsteroidParagraph>
                    <AsteroidParagraph>
                      kilometers per second: <Bold>{item.relative_velocity.kilometers_per_second}</Bold>
                    </AsteroidParagraph>
                    <AsteroidParagraph>
                      miles per hour: <Bold>{item.relative_velocity.miles_per_hour}</Bold>
                    </AsteroidParagraph>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Miss Distance</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AsteroidParagraph>
                      astronomical: <Bold>{item.miss_distance.astronomical}</Bold>
                    </AsteroidParagraph>
                    <AsteroidParagraph>
                      kilometers: <Bold>{item.miss_distance.kilometers}</Bold>
                    </AsteroidParagraph>
                    <AsteroidParagraph>
                      lunar: <Bold>{item.miss_distance.lunar}</Bold>
                    </AsteroidParagraph>
                    <AsteroidParagraph>
                      miles: <Bold>{item.miss_distance.miles}</Bold>
                    </AsteroidParagraph>
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>

        {selectedAsteroid?.orbital_data && <Accordion sx={AccordionTopMargin} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Orbital Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(selectedAsteroid.orbital_data).map((item, idx) => {
              const value = selectedAsteroid.orbital_data as any
              return (item === 'orbit_class') ? (
                <Accordion key={idx}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>orbit class</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AsteroidParagraph>orbit class type: <Bold>{value[item].orbit_class_type}</Bold></AsteroidParagraph>
                    <AsteroidParagraph>
                      orbit class description: <Bold>{value[item].orbit_class_description}</Bold>
                    </AsteroidParagraph>
                    <AsteroidParagraph>
                      orbit class range: <Bold>{value[item].orbit_class_range}</Bold>
                    </AsteroidParagraph>
                  </AccordionDetails>
                </Accordion> 
              ) : (
                <AsteroidParagraph key={idx}>
                  {item.replaceAll('_', ' ')}: <Bold>{value[item]}</Bold>
                </AsteroidParagraph>
              )
            })}
          </AccordionDetails>
        </Accordion>}
      </AsteroidContainer>
    </HomeContainer>
  ); 
};

export default Detail;
