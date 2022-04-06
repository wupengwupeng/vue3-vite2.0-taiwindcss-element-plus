import { watch, computed, unref } from 'vue';
let rowspanArray: any

function spanRow({ row, column, rowIndex, columnIndex }: any, data: any, option: any) {
  if (rowIndex === 0 && columnIndex === 0) {
    computeSpanRow(data, option)
  }
  if ((unref(getCollection(data)) as number[]).includes(rowIndex)) {
    if (columnIndex === 1) {
      return [1, 2]
    } else if (columnIndex > 1 && columnIndex < 3) {
      return [0, 0]
    }
  }
  if (is(option, columnIndex)) {
    const rowspan = rowspanArray[columnIndex][rowIndex]
    const colspan = rowspan > 0 ? 1 : 0

    return {
      rowspan: rowspan,
      colspan: colspan
    }
  }

  return {
    rowspan: 1,
    colspan: 1
  }
}
// 获取分组得个数集合
function getCollection(data: any) {
  return computed(() => {
    const newData: any = {}
    const arr: any = []
    data.forEach((items: any) => {
      let keys: any = items.field1
      if (!newData.hasOwnProperty(items.field1)) {

        newData[keys] = [items]
      } else {
        newData[keys].push(items)
      }
    });
    Object.keys(newData).forEach((res: any, index: number) => {
      if (newData[res].length) {
        if (!arr.length) {
          arr.push(newData[res].length - 1)
        } else {
          arr.push(newData[res].length + arr[arr.length - 1])
        }
      }
    })
    return arr
  })
}

function computeSpanRow(data: any, option: any) {
  rowspanArray = []
  let tempRow = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < option.length; j++) {
      let index = option[j].index;
      let field = option[j].field;

      if (i === 0) {
        tempRow[index] = 0
        rowspanArray[index] = []
        rowspanArray[index].push(1)
      } else {
        if (data[i][field] === data[i - 1][field]) {
          rowspanArray[index][tempRow[index]] += 1
          rowspanArray[index].push(0)
        } else {
          rowspanArray[index].push(1)
          tempRow[index] = i
        }
      }
    }
  }
}

function is(option: any, index: any) {
  for (let i = 0; i < option.length; i++) {
    if (option[i].index === index) {
      return true
    }
  }
  return false
}

export { spanRow }