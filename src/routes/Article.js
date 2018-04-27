import React from 'react';
import { connect } from 'dva';
import ArticleComponent from '../components/Article';
import MainLayout from '../components/MainLayout/MainLayout';

function Article() {
  return (
    <MainLayout>
        <ArticleComponent />
    </MainLayout>
  );
}

export default connect()(Article);
