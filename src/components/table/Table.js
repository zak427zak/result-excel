import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(30)
  }

  // onClick() {
  //   console.log('click')
  // }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      // const $parent = $resizer.$el.parentNode // bad
      // const $parent = $resizer.$el.closest('.column') // better but bad
      const $parent = $resizer.closest('div[data-type="resizable"]') // best
      const coords = $parent.getCoords()
      document.onmousemove = (e) => {
        const delta = Math.floor(e.pageX - coords.right)
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px'
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  onMousemove() {
    console.log('mousemove')
  }

  // onMouseup() {
  //   console.log('mouseup')
  // }

}
