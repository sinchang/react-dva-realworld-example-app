import React from 'react';
import { connect } from 'dva';

const DeleteButton = props => {
  const del = () => {
    props.dispatch({
      type: 'comments/del',
      payload: {
        slug: props.slug,
        id: props.commentId
      }
    })
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
};

export default connect()(DeleteButton);
