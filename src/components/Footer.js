import React from 'react'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    )
  }
}

export default Footer
