import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Sidebar from '../components/sidebar'
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.siteTitle.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.siteTitle.siteMetadata.title} />
    <Sidebar navigation={data.sidebar.edges} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query AppQuery {
    siteTitle: site {
      siteMetadata {
        title
      }
    },
    sidebar: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            section
            title
          }
        }
      }
    }
  }
`
