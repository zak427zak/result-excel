import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';

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
    // console.log(event.target.getAttribute('data-resize'))
    if (event.target.dataset.resize) {
      console.log('start resize', event.target.dataset.resize)
    }
  }

  // onMousemove() {
  //   console.log('mousemove')
  // }
  //
  // onMouseup() {
  //   console.log('mouseup')
  // }

}
