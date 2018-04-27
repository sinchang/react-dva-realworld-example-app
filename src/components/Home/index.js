import Banner from './Banner'
import MainView from './MainView'
import React from 'react'
import Tags from './Tags'
import { connect } from 'dva'

const mapStateToProps = state => ({
  appName: 'Realworld',
  tags: state.tags.tags,
  token: state.user.token
})

class Home extends React.Component {
  render() {
    const { token, appName, tags } = this.props;
    return (
      <div className="home-page">
      <Banner token={token} appName={appName} />

      <div className="container page">
        <div className="row">
          <MainView />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps)(Home)
