import React from 'react';
import { connect } from 'dva';

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };

    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      this.props.dispatch({
        type: 'comments/create',
        payload: {
          slug: this.props.slug,
          body: this.state.body
        }
      })
      this.setState({
        body: ''
      })
    };
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            className="comment-author-img"
            alt={this.props.currentUser.username} />
          <button
            className="btn btn-sm btn-primary"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}

export default connect()(CommentInput);
