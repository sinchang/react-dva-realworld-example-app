import React from 'react';
import { connect } from 'dva';
import RegisterComponent from '../components/Register';
import MainLayout from '../components/MainLayout/MainLayout';

function Register() {
  return (
    <MainLayout>
        <RegisterComponent />
    </MainLayout>
  );
}

Register.propTypes = {
};

export default connect()(Register);
