export type ElTableColumnType = {
  type: string
  index: number | Function
  label: string
  'column-key': string
  prop: string
  width: string | number
  'min-width': string | number
  fixed: string | boolean
  'render-header': any
  sortable: string | boolean
  'sort-method': any
  'sort-by': any
  'sort-orders': any[]
  resizable: boolean
  formatter: any
  'show-overflow-tooltip': string
  align: string
  [key: string]: any
}
