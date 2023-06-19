import { IAsteroid } from 'modals/asteroids/Modals';

export const selectedAsteroid: IAsteroid = {
  "date": "2015-09-08",
  "id": "3727639",
  "name": "(2015 RN83)",
  "absolute_magnitude_h": 21.7,
  "estimated_diameter": {
    "kilometers": {
      "estimated_diameter_min": 0.1214940408,
      "estimated_diameter_max": 0.2716689341
    },
    "meters": {
      "estimated_diameter_min": 121.4940407996,
      "estimated_diameter_max": 271.6689340891
    },
    "miles": {
      "estimated_diameter_min": 0.0754928736,
      "estimated_diameter_max": 0.1688071972
    },
    "feet": {
      "estimated_diameter_min": 398.6025088171,
      "estimated_diameter_max": 891.3023057169
    }
  },
  "is_potentially_hazardous_asteroid": false,
  "close_approach_data": [
    {
      "close_approach_date": "2015-09-08",
      "close_approach_date_full": "2015-Sep-08 15:42",
      "epoch_date_close_approach": 1441726920000,
      "relative_velocity": {
        "kilometers_per_second": "12.0811420305",
        "kilometers_per_hour": "43492.1113096542",
        "miles_per_hour": "27024.3066079349"
      },
      "miss_distance": {
        "astronomical": "0.1684193589",
        "lunar": "65.5151306121",
        "kilometers": "25195177.358205543",
        "miles": "15655557.2525527734"
      },
      "orbiting_body": "Earth"
    }
  ],
  "is_sentry_object": false
};

export const asteroidsListMock: Array<IAsteroid> = [
  selectedAsteroid,
];
