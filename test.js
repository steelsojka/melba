import ski from './src';

const myObj = ski.object({
  prop: ski.string().required(),
  blorg: ski.object({
    prop2: ski.string().required()
  })
    .required()
});

const result = myObj.validate({
  prop: 'test',
  blorg: {
    prop2: '124124'
  }
});

console.log(result.isValid);

result.collector.accepted.forEach(entry => console.log('accepted', entry));
result.collector.rejected.forEach(entry => console.log('rejected', entry));
