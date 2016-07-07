import ski from './src';

const myObj = ski.object({
  prop: ski.string().required(),
  key: ski.any().some([
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
  key: 123,
  blorg: {
    prop2: 12
  }
});

console.log(result.isValid);

result.collector.rejected.forEach(entry => console.log('rejected', entry));
