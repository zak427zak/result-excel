import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('$root not provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in 
        ${this.name || ''} component`)
      }
      // То же самое, что и AddEventListener
      this.$root.on(listener, this[method].bind(this))
    })
  }

  // ToDO realize!
  removeDOMListeners() {
  }
}


function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
