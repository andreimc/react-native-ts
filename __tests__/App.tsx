import * as React from 'react'
import 'react-native'
import App from '../src/App'

// Note: test renderer must be required after react-native.
// tslint:disable-next-line:import-name
import * as renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(
    <App />
  )
})
