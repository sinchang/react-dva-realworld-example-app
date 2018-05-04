import { Link } from 'dva/router';
import React from 'react';
import { connect } from 'dva';

const ArticleActions = props => {
  const article = props.article;
  const profile = props.profile;
  const del = () => {
    props.dispatch({
      type: 'articles/del',
      payload: {
        slug: article.slug
      }
    })
  };

  const FollowUserButton = () => {
    if (!props.isAuthenticated) {
      return null;
    }
  
    const classes = 'btn btn-sm btn-outline-secondary';
  
    const handleClick = ev => {
      ev.preventDefault();
      if (profile.following) {
        props.dispatch({ type: 'profile/unfollow', payload: { username: profile.username}});
      } else {
        props.dispatch({ type: 'profile/follow', payload: { username: profile.username }});
      }
    };

    return (
      <button
        className={classes}
        onClick={handleClick}>
        <i className="ion-plus-round"></i>
        &nbsp;
        {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
      </button>
    );
  };

  const FavoriteButton = () => {
    if (!props.isAuthenticated) {
      return null;
    }
  
    let classes = 'btn btn-sm';

    if (article.favorited) {
      classes += ' btn-primary';
    } else {
      classes += ' btn-outline-primary';
    }
  
    const handleClick = ev => {
      ev.preventDefault();
      if (article.favorited) {
        props.dispatch({ type: 'articles/unFavorite', payload: { slug: article.slug }});
      } else {
        props.dispatch({ type: 'articles/favorite', payload: { slug: article.slug }});
      }
    };
    return (
      <button
        className={classes}
        onClick={handleClick}>
        <i className="ion-heart"></i>
        &nbsp;
        {article.favorited ? 'Unfavorited' : 'Favorited'} Article({article.favoritesCount})
      </button>
    );
  };

  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
        </Link>
        &nbsp;&nbsp;
        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>

      </span>
    );
  }

  return (
    <span>
      <FollowUserButton />
      &nbsp;&nbsp;
      <FavoriteButton />
    </span>
  );
};

export default connect()(ArticleActions);
