import { Component } from 'react'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    this.setState({
      loaded: true
    })
  }

  render() {
    return (
      this.state.loaded ? this.props.children : null
    )
  }
}

export default Auth
