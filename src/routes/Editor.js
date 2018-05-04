import React from 'react';
import { connect } from 'dva';
import EditorComponent from '../components/Editor';
import MainLayout from '../components/MainLayout/MainLayout';

function Editor() {
  return (
    <MainLayout>
        <EditorComponent />
    </MainLayout>
  );
}

Editor.propTypes = {
};

export default connect()(Editor);
