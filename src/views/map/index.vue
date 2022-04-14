<script setup lang="ts" name="Map">

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

interface Dog {
  live(): void
}
interface Cat {
  eat(): void
}
type Example1 = Dog extends Cat ? number : string;

type MabeUser = {
  id: number
  name?: string
  age: number
  readonly aa: string
}
type Concrete<Type> = {
  -readonly [property in keyof Type as `get${Capitalize<string & property>}`]-?: Type[property];
}

type ConrateTwo<Type> = {
  [property in keyof Type as Exclude<property, 'name'>]: Type[property]
}

type User = Concrete<MabeUser>

type UserTwo = ConrateTwo<MabeUser>

// Required<Type>

type Wupeng = {
  name: string
  age?: number
}
const obj: Required<Wupeng> = { name: '吴鹏', age: 13 }

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {});

// Record<keys,type>

interface Obj {
  name: string
  age: number
}
type Keys = 'firstName' | 'secondName' | 'threedName'
type RecordTypes = Record<Keys, Obj>
const newObj: RecordTypes = {
  firstName: {
    name: 'WUPENG',
    age: 32
  },
  secondName: {
    name: 'ZHANGSNA',
    age: 23
  },
  threedName: {
    name: 'LISHT',
    age: 2
  }
}


// class User {
//   private userId: number;
//   constructor(userId: number) {
//     this.userId = userId
//   }
// }
// const proxy = new UserTask(123)




</script>


<template>
  <MainCard>
    adfs
  </MainCard>
</template>