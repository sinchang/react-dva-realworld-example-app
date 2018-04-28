import ArticleList from './ArticleList';
import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
const DEFAULT_AVATAR_IMAGE = 'https://static.productionready.io/images/smiley-cyrus.jpg'

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
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

const mapStateToProps = state => ({
  // currentUser: state.common.currentUser,
  profile: state.profile.user,
  articles: state.articles.articles,
  tab: state.profile.tab
});

const mapDispatchToProps = dispatch => ({
  // onFollow: username => dispatch({
  //   type: FOLLOW_USER,
  //   payload: agent.Profile.follow(username)
  // }),
  // onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  // onUnfollow: username => dispatch({
  //   type: UNFOLLOW_USER,
  //   payload: agent.Profile.unfollow(username)
  // }),
  // onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
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

                <img src={profile.image ? profile.image : DEFAULT_AVATAR_IMAGE} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
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
                pager={this.props.pager}
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                state={this.props.currentPage} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
