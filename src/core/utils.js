// Pure functions - не взаимодействуют с глобальными переменными
// только реагируют на входящие параметры и возвращают результат
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}
