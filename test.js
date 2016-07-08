import ski from './src';

const myObj = ski.object({
  prop: ski.string().required(),
  key: ski.some([
    ski.string(),
    ski.number()
  ]),
  blorg: ski.object({
    prop2: ski.number()
  })
    .required()
});

const result = myObj.validate({
  prop: 'test',
  key: 'test',
  blorg: {
    prop2: 12
  }
});

console.log(result.isValid);

console.log(result.collector.rejected.length);
result.collector.rejected.forEach(entry => console.log('rejected', entry));
