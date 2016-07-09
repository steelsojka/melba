import ski from './src';

const myObj = ski.object({
  prop: ski.any(),
  key: ski.string().when('prop', [
    [ski.string().required(), ski.required()],
  ]),
  list: ski.array()
    .required(),
  blorg: ski.object({
    prop2: ski.number()
  })
    .required()
});

// const result = ski.object({ key: ski.boolean() })
//   .sanitize({
//     key: []
//   });

// console.log(result);

const result = myObj.validate({
  prop: 'jasda',
  key: '',
  list: [],
  blorg: {
    prop2: 12
  }
});

console.log(result.isValid);

console.log(result.collector.rejected.length);
result.collector.rejected.forEach(entry => console.log('rejected', entry));
