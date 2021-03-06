import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <h1>
              Latest ramblings
            </h1>
            <BlogRoll />
          </div>
        </section>
      </Layout>
    )
  }
}
