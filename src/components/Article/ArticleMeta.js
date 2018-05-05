import ArticleActions from './ArticleActions';
import { Link } from 'dva/router';
import React from 'react';
const ArticleMeta = props => {
  const article = props.article;
  const profile = props.profile;
  const isAuthenticated = props.isAuthenticated;
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions 
        canModify={props.canModify} 
        article={article} 
        profile={profile}
        isAuthenticated={isAuthenticated}/>
    </div>
  );
};

export default ArticleMeta;
