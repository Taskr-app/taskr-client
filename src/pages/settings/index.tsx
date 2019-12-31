import React from 'react';
import SettingsLayout from '../../components/layouts/SettingsLayout';
import styles from './Settings.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import AccountSettingsPage from './account';

const SettingsPage: React.FC = () => {
  return (
    <SettingsLayout>
      <div className={styles.settingsContent}>
        <Switch>
          <Route exact path='/settings/account' component={AccountSettingsPage} />
          <Redirect to="/settings/account" />
        </Switch>
      </div>
    </SettingsLayout>
  );
};

export default SettingsPage;
