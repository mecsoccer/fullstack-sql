"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const asteroids_1 = require("../../repo/asteroids");
const seedTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, asteroids_1.addAsteroidToDB)(asteroids[0]);
    yield (0, asteroids_1.addAsteroidToDB)(asteroids[1]);
});
exports.default = seedTasks;
const asteroids = [
    {
        date: '2015-09-08',
        links: {
            self: 'http://api.nasa.gov/neo/rest/v1/neo/3727639?api_key=DEMO_KEY'
        },
        id: '3727639',
        neo_reference_id: '3727639',
        name: '(2015 RN83)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3727639',
        absolute_magnitude_h: 21.7,
        estimated_diameter: {
            kilometers: {
                estimated_diameter_min: 0.1214940408,
                estimated_diameter_max: 0.2716689341
            },
            meters: {
                estimated_diameter_min: 121.4940407996,
                estimated_diameter_max: 271.6689340891
            },
            miles: {
                estimated_diameter_min: 0.0754928736,
                estimated_diameter_max: 0.1688071972
            },
            feet: {
                estimated_diameter_min: 398.6025088171,
                estimated_diameter_max: 891.3023057169
            }
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
            {
                close_approach_date: '2015-09-08',
                close_approach_date_full: '2015-Sep-08 15:42',
                epoch_date_close_approach: 1441726920000,
                relative_velocity: {
                    kilometers_per_second: '12.0811420305',
                    kilometers_per_hour: '43492.1113096542',
                    miles_per_hour: '27024.3066079349'
                },
                miss_distance: {
                    astronomical: '0.1684193589',
                    lunar: '65.5151306121',
                    kilometers: '25195177.358205543',
                    miles: '15655557.2525527734'
                },
                orbiting_body: 'Earth'
            }
        ],
        is_sentry_object: false
    },
    {
        date: '2015-09-09',
        links: {
            self: 'http://api.nasa.gov/neo/rest/v1/neo/3726710?api_key=DEMO_KEY'
        },
        id: '3726710',
        neo_reference_id: '3726710',
        name: '(2015 RC)',
        designation: '2015 RC',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3726710',
        absolute_magnitude_h: 24.3,
        estimated_diameter: {
            kilometers: {
                estimated_diameter_min: 0.0366906138,
                estimated_diameter_max: 0.0820427065
            },
            meters: {
                estimated_diameter_min: 36.6906137531,
                estimated_diameter_max: 82.0427064882
            },
            miles: {
                estimated_diameter_min: 0.0227984834,
                estimated_diameter_max: 0.0509789586
            },
            feet: {
                estimated_diameter_min: 120.3760332259,
                estimated_diameter_max: 269.1689931548
            }
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
            {
                close_approach_date: '2015-09-08',
                close_approach_date_full: '2015-Sep-08 09:45',
                epoch_date_close_approach: 1441705500000,
                relative_velocity: {
                    kilometers_per_second: '19.486643553',
                    kilometers_per_hour: '70151.9167909206',
                    miles_per_hour: '43589.6729637806'
                },
                miss_distance: {
                    astronomical: '0.0269252677',
                    lunar: '10.4739291353',
                    kilometers: '4027962.697099799',
                    miles: '2502859.9608192662'
                },
                orbiting_body: 'Earth'
            }
        ],
        orbital_data: {
            orbit_id: '6',
            orbit_determination_date: '2021-04-15 14:25:14',
            first_observation_date: '2015-09-06',
            last_observation_date: '2015-09-12',
            data_arc_in_days: 6,
            observations_used: 122,
            orbit_uncertainty: '7',
            minimum_orbit_intersection: '.0228243',
            jupiter_tisserand_invariant: '3.130',
            epoch_osculation: '2460000.5',
            eccentricity: '.6225515942230192',
            semi_major_axis: '2.373220333573105',
            inclination: '27.46401245698785',
            ascending_node_longitude: '163.0477749894055',
            orbital_period: '1335.38199981732',
            perihelion_distance: '.895768231464683',
            perihelion_argument: '229.8431562397934',
            aphelion_distance: '3.850672435681527',
            perihelion_time: '2459984.071520826284',
            mean_anomaly: '4.428884396634723',
            mean_motion: '.2695857814836862',
            equinox: 'J2000',
            orbit_class: {
                orbit_class_type: 'APO',
                orbit_class_description: 'Near-Earth asteroid orbits which cross the Earth’s orbit similar to that of 1862 Apollo',
                orbit_class_range: 'a (semi-major axis) > 1.0 AU; q (perihelion) < 1.017 AU'
            }
        },
        is_sentry_object: false
    },
    {
        date: '2023-06-15',
        links: {
            self: 'http://api.nasa.gov/neo/rest/v1/neo/2162882?api_key=DEMO_KEY'
        },
        id: '2162882',
        neo_reference_id: '2162882',
        name: '162882 (2001 FD58)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2162882',
        absolute_magnitude_h: 18.82,
        estimated_diameter: {
            kilometers: {
                estimated_diameter_min: 0.4576726672,
                estimated_diameter_max: 1.0233871954
            },
            meters: {
                estimated_diameter_min: 457.6726672313,
                estimated_diameter_max: 1023.3871953728
            },
            miles: {
                estimated_diameter_min: 0.2843845229,
                estimated_diameter_max: 0.635903125
            },
            feet: {
                estimated_diameter_min: 1501.5507935591,
                estimated_diameter_max: 3357.5696460668
            }
        },
        is_potentially_hazardous_asteroid: true,
        close_approach_data: [
            {
                close_approach_date: '2023-06-15',
                close_approach_date_full: '2023-Jun-15 08:41',
                epoch_date_close_approach: 1686818460000,
                relative_velocity: {
                    kilometers_per_second: '10.8614203559',
                    kilometers_per_hour: '39101.1132813948',
                    miles_per_hour: '24295.9111942089'
                },
                miss_distance: {
                    astronomical: '0.3897200736',
                    lunar: '151.6011086304',
                    kilometers: '58301292.906803232',
                    miles: '36226743.5558673216'
                },
                orbiting_body: 'Earth'
            }
        ],
        is_sentry_object: false
    },
    {
        links: {
            self: 'http://api.nasa.gov/neo/rest/v1/neo/3065824?api_key=DEMO_KEY'
        },
        id: '3065824',
        neo_reference_id: '3065824',
        name: '(2000 WM63)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3065824',
        absolute_magnitude_h: 20.28,
        estimated_diameter: {
            kilometers: {
                estimated_diameter_min: 0.233644185,
                estimated_diameter_max: 0.5224442801
            },
            meters: {
                estimated_diameter_min: 233.6441849736,
                estimated_diameter_max: 522.4442801486
            },
            miles: {
                estimated_diameter_min: 0.1451797209,
                estimated_diameter_max: 0.3246317248
            },
            feet: {
                estimated_diameter_min: 766.5491878289,
                estimated_diameter_max: 1714.0560920828
            }
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
            {
                close_approach_date: '2023-06-15',
                close_approach_date_full: '2023-Jun-15 22:07',
                epoch_date_close_approach: 1686866820000,
                relative_velocity: {
                    kilometers_per_second: '11.7862319536',
                    kilometers_per_hour: '42430.4350330018',
                    miles_per_hour: '26364.6222570338'
                },
                miss_distance: {
                    astronomical: '0.1632217909',
                    lunar: '63.4932766601',
                    kilometers: '24417632.256225383',
                    miles: '15172413.1298729654'
                },
                orbiting_body: 'Earth'
            }
        ],
        is_sentry_object: false,
        date: '2023-06-15'
    },
    {
        links: {
            self: 'http://api.nasa.gov/neo/rest/v1/neo/3781003?api_key=DEMO_KEY'
        },
        id: '3781003',
        neo_reference_id: '3781003',
        name: '(2017 QF17)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3781003',
        absolute_magnitude_h: 19.7,
        estimated_diameter: {
            kilometers: {
                estimated_diameter_min: 0.3051792326,
                estimated_diameter_max: 0.6824015094
            },
            meters: {
                estimated_diameter_min: 305.1792325939,
                estimated_diameter_max: 682.4015094011
            },
            miles: {
                estimated_diameter_min: 0.1896295249,
                estimated_diameter_max: 0.4240245083
            },
            feet: {
                estimated_diameter_min: 1001.2442334633,
                estimated_diameter_max: 2238.8501681036
            }
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
            {
                close_approach_date: '2023-06-15',
                close_approach_date_full: '2023-Jun-15 02:37',
                epoch_date_close_approach: 1686796620000,
                relative_velocity: {
                    kilometers_per_second: '6.9602479155',
                    kilometers_per_hour: '25056.8924958037',
                    miles_per_hour: '15569.3785621843'
                },
                miss_distance: {
                    astronomical: '0.334297163',
                    lunar: '130.041596407',
                    kilometers: '50010143.53184281',
                    miles: '31074862.230178378'
                },
                orbiting_body: 'Earth'
            }
        ],
        is_sentry_object: false,
        date: '2023-06-15'
    },
    {
        links: {
            self: 'http://api.nasa.gov/neo/rest/v1/neo/3844004?api_key=DEMO_KEY'
        },
        id: '3844004',
        neo_reference_id: '3844004',
        name: '(2019 SP2)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3844004',
        absolute_magnitude_h: 23.9,
        estimated_diameter: {
            kilometers: {
                estimated_diameter_min: 0.04411182,
                estimated_diameter_max: 0.0986370281
            },
            meters: {
                estimated_diameter_min: 44.1118199997,
                estimated_diameter_max: 98.6370281305
            },
            miles: {
                estimated_diameter_min: 0.0274098057,
                estimated_diameter_max: 0.0612901888
            },
            feet: {
                estimated_diameter_min: 144.7238235278,
                estimated_diameter_max: 323.6123073718
            }
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
            {
                close_approach_date: '2023-06-15',
                close_approach_date_full: '2023-Jun-15 01:20',
                epoch_date_close_approach: 1686792000000,
                relative_velocity: {
                    kilometers_per_second: '5.443262288',
                    kilometers_per_hour: '19595.7442367916',
                    miles_per_hour: '12176.033412022'
                },
                miss_distance: {
                    astronomical: '0.3324181668',
                    lunar: '129.3106668852',
                    kilometers: '49729049.702584716',
                    miles: '30900198.6239364408'
                },
                orbiting_body: 'Earth'
            }
        ],
        is_sentry_object: false,
        date: '2023-06-15'
    }
];
//# sourceMappingURL=tasks.js.map