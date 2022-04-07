<script setup lang="ts">

interface Box {
  contents: unknown
}
const x: Box = {
  contents: ''
}

const MyArray = [
  { name: 'Alice', age: 12 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 2 }
]
type Person = typeof MyArray[2]
const a: Person = {
  name: 'lisi',
  age: 9
}
// You can't use a const to make a variable reference. However, you can use a type alias for a similar style of refactor
type key = 'age'
type Age = Person[key]
console.log(a, 'a');

</script>


<template>
  <div>我是地图</div>
</template>