import React from 'react'
import { shallow } from 'enzyme'

import App from './App.js'
import GameBoard from './app/components/GameBoard.js'

describe('App test', () => {

  test('App renders correctly', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.App')).toHaveLength(1)
    expect(wrapper.find('.App-header')).toHaveLength(1)
    expect(wrapper.find('.App-header_logo')).toHaveLength(1)
    expect(wrapper.find('.App-header_text')).toHaveLength(1)
    expect(wrapper.find('.App-body')).toHaveLength(1)
    expect(wrapper.find('.App-body_logo')).toHaveLength(1)
    expect(wrapper.find('.App-body_rules')).toHaveLength(1)
    expect(wrapper.find('.App-body_button')).toHaveLength(1)
    wrapper.unmount()
  })

  test('App renders correctly if beginGame is true', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App')).toHaveLength(1)
    expect(wrapper.find('.App-header')).toHaveLength(1)
    expect(wrapper.find('.App-header_logo')).toHaveLength(1)
    expect(wrapper.find('.App-header_text')).toHaveLength(1)
    expect(wrapper.find('.App-body')).toHaveLength(1)
    wrapper.setState({ beginGame: true });
    expect(wrapper.state('beginGame')).toEqual(true)
    expect(wrapper.find(<GameBoard/>))
    wrapper.unmount()
  })

})
