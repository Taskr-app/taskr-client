import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'enzyme';
import createMemoryHistory, {
  MemoryHistory
} from 'history/createMemoryHistory';

interface RenderWithRouterProps {
  route?: string;
  history?: MemoryHistory<any>;
}

// test utils file
export const renderWithRouter = (
  ui: React.ReactElement<any>,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  }: RenderWithRouterProps = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
};
