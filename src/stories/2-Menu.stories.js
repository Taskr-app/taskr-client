import React from 'react';
import { NavMenu, Menu } from '../components/common/Menu';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import '../index.scss';
import { mockMeQuery } from '../__tests__/utils/mockQueries'
import Layout from '../components/layouts/Layout';

export default {
  title: 'Menu',
  component: Menu
};

const options = [
  { key: 'projects', route: '/projects' },
  { key: 'teams', route: '/teams' }
];

export const NavMenuExample = () => {
  return (
    <MockedProvider mocks={[mockMeQuery]}>
    <MemoryRouter initialEntries={['/']}>
      <Layout dark={0}>
        <NavMenu options={options} />
      </Layout>
    </MemoryRouter>

    </MockedProvider>
  );
};
