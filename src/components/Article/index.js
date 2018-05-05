import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import { connect } from 'dva';
import marked from 'marked';
import { Link } from 'dva/router'

const mapStateToProps = state => ({
  article: state.articles.article,
  currentUser: state.user.user,
  profile: state.profile.user,
  comments: state.comments.comments,
  isAuthenticated: state.user.isAuthenticated
});


class Article extends React.Component {
  render() {
    if (!this.props.article) {
      return null;
    }

    const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.article.title}</h1>
            <ArticleMeta
              isAuthenticated={this.props.isAuthenticated}
              profile={this.props.profile}
              article={this.props.article}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.article.tagList.map(tag => {
                    return (
                      <li key={tag}>
                        <Link
                          to={`/tag/${tag}`}
                          className="tag-default tag-pill tag-outline">
                          {tag}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments}
              // errors={this.props.commentErrors}
              slug={this.props.article.slug}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Article);
