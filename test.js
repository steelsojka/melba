import ski from './src';

const myObj = ski.object({
  prop: ski.string().required(),
  key: ski.when('prop', [
    [ski.string().required(), ski.number().required()],
    [() => true, ski.string().required()]
  ]),
  list: ski.array()
    .required(),
  blorg: ski.object({
    prop2: ski.number()
  })
    .required()
});

const result = myObj.validate({
  prop: 'test',
  key: 123,
  list: [],
  blorg: {
    prop2: 12
  }
});

console.log(result.isValid);

console.log(result.collector.rejected.length);
result.collector.rejected.forEach(entry => console.log('rejected', entry));
