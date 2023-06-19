import { render, screen } from '@testing-library/react';
import Home from './Home';
import { asteroidsListMock } from 'mocks/asteroids.mock';
import { store } from 'state_management/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
  test('renders Home', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home asteroids={[]}/>
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText(`${asteroidsListMock[0].name}`)).toBeInTheDocument();
  });

  test('renders Home with no asteroids', async () => {
    render(
      <Provider store={store}>
        <Home asteroids={[]}/>
      </Provider>,
    );
    expect(screen.getByText(/No Asteroids were found/i)).toBeInTheDocument();
  });

  test('renders Home expected asteroids', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home asteroids={asteroidsListMock}/>
        </BrowserRouter>
      </Provider>,
    );
    const renderedAsteroids = await screen.findAllByTestId(`asteroid-test-id`);
    expect(renderedAsteroids).toHaveLength(asteroidsListMock.length);
  });
});
