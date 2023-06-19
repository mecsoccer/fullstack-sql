import { getAsteroidById, getAllAsteroids} from "./asteroids.actions";
import {AsteroidsActionTypes} from "./actionTypes";


describe('Asteroids actions', () => {
    test('getAsteroidById', () => {
        expect(getAsteroidById('1')).toEqual( {
            payload:  {
                request:  {
                    method: "get",
                    url: "/asteroids/1",
                 },
            },
            type: AsteroidsActionTypes.GET_ASTEROID_BY_ID,
        });
    });

    test('getAllAsteroids', () => {
        expect(getAllAsteroids()).toEqual(   {
            payload:  {
                request:  {
                    method: "get",
                    url: "/asteroids",
                    params: { limit: 20, offset: 0 },
                },
                
            },
            type: AsteroidsActionTypes.GET_ALL_ASTEROIDS}
        );
    });
});