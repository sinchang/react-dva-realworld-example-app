import ArticleList from './ArticleList';
import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = props => {
  if (props.isUser || !props.isAuthenticated) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.profile.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.profile.following) {
      props.dispatch({ type: 'profile/unfollow', payload: { username: props.profile.username }});
    } else {
      props.dispatch({ type: 'profile/follow', payload: { username: props.profile.username }});
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.profile.following ? 'Unfollow' : 'Follow'} {props.profile.username}
    </button>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  currentUser: state.user.user,
  articles: state.articles.articles,
  currentPage: state.articles.currentPage,
  articlesCount: state.articles.articlesCount,
  tab: state.profile.tab,
  isAuthenticated: state.user.isAuthenticated
});

class Profile extends React.Component {

  renderTabs() {
    let myTabClass = 'nav-link', favroitedTabClass = 'nav-link';

    if (this.props.tab === 'my') {
      myTabClass = myTabClass + ' active';
    }

    if (this.props.tab === 'favorited') {
      favroitedTabClass = favroitedTabClass + ' active';
    }

    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={ myTabClass }
            to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={ favroitedTabClass }
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const profile = this.props.profile;
    const dispatch = this.props.dispatch;
    const isAuthenticated = this.props.isAuthenticated;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  isAuthenticated={isAuthenticated}
                  dispatch={dispatch}
                  profile={profile}
                  />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <ArticleList
                pager={Math.ceil(this.props.articlesCount / 10)}
                type={this.props.tab}
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                currentPage={this.props.currentPage} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);
