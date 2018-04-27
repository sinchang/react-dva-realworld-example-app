import React from 'react';
import { connect } from 'dva';
import ProfileComponent from '../components/Profile';
import MainLayout from '../components/MainLayout/MainLayout';

function Profile() {
  return (
    <MainLayout>
        <ProfileComponent />
    </MainLayout>
  );
}

Profile.propTypes = {
};

export default connect()(Profile);
