import ArticleList from '../ArticleList';
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

const YourFeedTab = props => {
  if (props.token) {
    return (
      <li className="nav-item">
        <Link to="/feed"
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }>
          Your Feed
        </Link>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  return (
    <li className="nav-item">
      <Link
        to="/"
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }>
        Global Feed
      </Link>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  isAuthenticated: state.user.isAuthenticated,
  tab: state.articles.tab,
  tag: state.articles.tag
});

function MainView({ dispatch, articles, isAuthenticated, tab, tag }) {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={isAuthenticated}
            tab={tab}/>

          <GlobalFeedTab tab={tab}/>

          <TagFilterTab tag={tag} />

        </ul>
      </div>

      <ArticleList
        pager='12'
        articles={articles}
        loading='false'
        articlesCount='12'
        currentPage='1' />
    </div>
  );
};

export default connect(mapStateToProps)(MainView);
