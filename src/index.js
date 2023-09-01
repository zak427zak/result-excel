import './scss/index.scss'
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Table} from './components/table/Table';
import {Excel} from './components/excel/Excel';
import {Formula} from './components/formula/Formula';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
})

excel.render()
