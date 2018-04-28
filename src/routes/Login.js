import React from 'react';
import { connect } from 'dva';
import LoginComponent from '../components/Login';
import MainLayout from '../components/MainLayout/MainLayout';

function Login() {
  return (
    <MainLayout>
        <LoginComponent />
    </MainLayout>
  );
}

Login.propTypes = {
};

export default connect()(Login);
