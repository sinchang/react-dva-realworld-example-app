// import ListErrors from './ListErrors';
import React from 'react';
import { connect } from 'dva';

const mapStateToProps = state => ({
  ...state.editor
});

class Editor extends React.Component {
  constructor() {
    super();
    const updateFieldEvent =
      key => ev => this.props.dispatch({
        type: 'editor/onUpdateField',
        payload: {
          [key]: ev.target.value
        }
      });
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.dispatch({
          type: 'editor/onAddTag'
        });
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.dispatch({
        type: 'editor/onRemoveTag',
        payload: {
          tag
        }
      });
    };

    this.submitForm = ev => {
      ev.preventDefault();
      console.log(this.props)
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      };

      // const slug = { slug: this.props.slug };
      this.props.slug ?
        this.props.dispatch({
          type: 'editor/update',
          payload: {
            article,
            slug: this.props.slug
          }
        }) :
        this.props.dispatch({
          type: 'editor/create',
          payload: {
            article
          }
        })
    };
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              {/* <ListErrors errors={this.props.errors}></ListErrors> */}

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <div className="tag-list">
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span className="tag-default tag-pill" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Article
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Editor);
