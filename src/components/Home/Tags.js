import React from 'react';
import { Link } from 'dva/router';

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {
            return (
              <Link
                to={`/tag/${tag}`}
                className="tag-default tag-pill"
                key={tag}>
                {tag}
              </Link>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
};

export default Tags;
