import React from 'react';
import { connect } from 'dva';
import SettingsComponent from '../components/Settings';
import MainLayout from '../components/MainLayout/MainLayout';

function Settings() {
  return (
    <MainLayout>
        <SettingsComponent />
    </MainLayout>
  );
}

Settings.propTypes = {
};

export default connect()(Settings);
