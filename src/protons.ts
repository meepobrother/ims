import { protons } from 'ims-protons'
const proto = `
enum FOO {
  BAR = 1;
}
message Test {
  required float num  = 1;
  required string payload = 2;
}
message AnotherOne {
  repeated FOO list = 1;
}
`
enum FOO {
  BAR = 1
}
export interface Demo {
  Test: {
    num: number;
    payload: string;
  }
  AnotherOne: {
    list: FOO[]
  }
}
// pass a proto file as a buffer/string or pass a parsed protobuf-schema object
const messages = protons<Demo>(proto)

const buf = messages.Test.encode({
  num: 42,
  payload: 'hello world'
})

console.log(buf) // should print a buffer

const obj = messages.Test.decode(buf)
console.log(obj) // should print an object similar to above

const buf1 = messages.AnotherOne.encode({
  list: [
    FOO.BAR
  ]
})
console.log(buf1)
const buf1Dec = messages.AnotherOne.decode(buf1)
console.log(buf1Dec)
debugger;