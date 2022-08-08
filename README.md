

### 使用教程
```bash
npm install only-number-input
```





```javascript
// 再main.js 项目入口文件中进行使用
import OnlyNumberInput from 'only-number-input'
const app = crateApp()
app.use(OnlyNumberInput)
```

### Props 配置 也可直接使用el-input的所有属性和方法

| 参数 | 说明                         |  类型   | 默认值 |
| :--- | :--------------------------- | :-----: | :----: |
| argOptions       | 可选项传入正则表达式/[^\d\,]/g 只能输入数字和英文逗号 |  Object  |   {maxLength: 2,reg: /[^\d]/g}   |

## 再组件中进行使用

```vue3
<template>
<OnlyNumberInput :argOptions="{maxLength:4,reg: /[^\d\,]/g}" />
</template>


<script setup lang="ts">
import {ref Ref} from 'vue'

const obj = ref({
  maxLength: 3,
  reg: /[^\d\,]/g
})
</script>
```
