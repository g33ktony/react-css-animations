import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import prefixAll from 'inline-style-prefixer/static'
import CSSAnimation from '../../src/CSSAnimation'

const defaultStyle = {
  animationName: '',
  animationTimingFunction: 'linear',
  animationDirection: 'normal',
  animationFillMode: 'none',
  animationPlayState: 'running',
  animationDelay: '0ms',
  animationDuration: '0ms',
  animationIterationCount: 1,
}

describe('<CSSAnimation>', function() {
  it('renders children', () => {
    const component = (
      <CSSAnimation>
        <span id="foo"></span>
      </CSSAnimation>
    )
    expect(shallow(component).contains(<span id="foo"></span>)).to.equal(true)
  })

  it('default props', () => {
    const wrapper = mount(<CSSAnimation/>)
    const props = wrapper.props()
    expect(props.onStart).to.be.a('function')
    expect(props.onIteration).to.be.a('function')
    expect(props.onEnd).to.be.a('function')
    expect(props.name).to.equal('')
    expect(props.timingFunction).to.equal('linear')
    expect(props.direction).to.equal('normal')
    expect(props.fillMode).to.equal('none')
    expect(props.playState).to.equal('running')
    expect(props.delay).to.equal(0)
    expect(props.duration).to.equal(0)
    expect(props.infinite).to.equal(false)
    expect(props.iterationCount).to.equal(1)
  })

  it('default styles', () => {
    const wrapper = shallow(<CSSAnimation/>)
    const { style } = wrapper.props()
    const expectedStyle = prefixAll(defaultStyle)
    expect(style).to.eql(expectedStyle)
  })

  it('animation inline styles', () => {
    const wrapper = shallow(
      <CSSAnimation
        name='foo'
        timingFunction='ease-in-out'
        direction='alternate'
        fillMode='forwards'
        playState='paused'
        delay={500}
        duration={2000}
        iterationCount={4}
      />
    )
    const { style } = wrapper.props()
    const expectedStyle = prefixAll({
      animationName: 'foo',
      animationTimingFunction: 'ease-in-out',
      animationDirection: 'alternate',
      animationFillMode: 'forwards',
      animationPlayState: 'paused',
      animationDelay: '500ms',
      animationDuration: '2000ms',
      animationIterationCount: 4,
    })
    expect(style).to.eql(expectedStyle)
  })

  it('extends inline styles', () => {
    const wrapper = shallow(
      <CSSAnimation
        style={{background:'red'}}
      />
    )
    const { style } = wrapper.props()
    const expectedStyle = prefixAll(Object.assign({
      background: 'red'
    }, defaultStyle))
    expect(style).to.eql(expectedStyle)
  })

  it('inifinite (convienence property)', () => {
    const wrapper = shallow(<CSSAnimation infinite={true}/>)
    const { style } = wrapper.props()
    expect(style.animationIterationCount).to.equal('infinite')
  })

  it('extra props', () => {
    const wrapper = shallow(<CSSAnimation id='foo'/>)
    const { id } = wrapper.props()
    expect(id).to.equal('foo')
  })

  it('animation events', () => {
    const onStart = sinon.spy()
    const onIteration = sinon.spy()
    const onEnd = sinon.spy()
    const root = document.createElement('div')
    document.body.appendChild(root)
    const wrapper = mount(
      <CSSAnimation
        id='foo'
        onStart={onStart}
        onIteration={onIteration}
        onEnd={onEnd}
      />
    , { attachTo: root })

    const node = document.querySelector('#foo')
    const events = ['start', 'iteration', 'end'].map(e => `animation${e}`)
    events.forEach(e => simulateEvent(node, e))
    expect(onStart.calledOnce).to.equal(true)
    expect(onIteration.calledOnce).to.equal(true)
    expect(onEnd.calledOnce).to.equal(true)
  })
})


function simulateEvent(node, eventName) {
  const e = new window.Event(eventName)
  node.dispatchEvent(e)
}
