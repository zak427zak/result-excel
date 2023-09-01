const CODES = {
  A: 65,
  Z: 90
}

// eslint-disable-next-line no-unused-vars
function createCell() {
  return `
        <div class="cell" contenteditable="">B2</div>`
}

// eslint-disable-next-line no-unused-vars
function toColumn(col) {
  return `
     <div class="column">${col}</div>`
}

function createRow(content) {
  return `
    <div class="row">
    <div class="row-info"></div>
    <div class="row-data">${ content }</div>
</div>`
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  // eslint-disable-next-line no-unused-vars
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols))

  for (let i =0; i<rowsCount; i++) {
    const colsInner = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')
    rows.push(createRow(colsInner))
  }

  return rows.join('')
}
