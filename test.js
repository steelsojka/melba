import ski from './src';

const myObj = ski.object({
  prop: ski.string().required(),
  blorg: ski.object({
    prop2: ski.number()
  })
    .required()
});

const result = myObj.validate({
  prop: 'test',
  blorg: {
    prop2: null
  }
}, {
  emptyValues: ['']
});

console.log(result.isValid);

result.collector.rejected.forEach(entry => console.log('rejected', entry));
