import React from 'react';
import { connect } from 'dva';
import HomeComponent from '../components/Home';
import MainLayout from '../components/MainLayout/MainLayout';

function Home() {
  return (
    <MainLayout>
        <HomeComponent />
    </MainLayout>
  );
}

Home.propTypes = {
};

export default connect()(Home);
