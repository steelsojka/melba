import ski from './src';

// const myObj = ski.object({
//   prop: ski.any(),
//   key: ski.string().when('prop', [
//     [ski.string().required(), ski.required()],
//   ]),
//   list: ski.array()
//     .required(),
//   blorg: ski.object({
//     prop2: ski.number()
//   })
//     .required()
// });

const myArray = ski.object({
  test: ski.boolean().required()
    .empty(ski.string())
})

console.log(myArray.validate({
  test: false
})._collector.rejected[0]);

// const result = ski.object({ key: ski.boolean() })
//   .sanitize({
//     key: []
//   });

// console.log(result);

// const result = myObj.validate({
//   prop: 'jasda',
//   key: null,
//   list: [],
//   blorg: {
//     prop2: 12
//   }
// });

// console.log(result.isValid);

// console.log(result._collector.rejected.length);
// result._collector.rejected.forEach(entry => console.log('rejected', entry));
