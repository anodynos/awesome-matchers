import * as _ from 'lodash';

export const john = {
  address: {
    country: 'United Kingdom',
    city: 'London',
    street: {
      name: 'Long Acre',
      no: 22,
    }
  },
  name: 'john',
};

export const john2 = _.cloneDeep(john);

export const johnLike = _.cloneDeep(_.pick(john, ['address']));

export const maria =  {
  address: {
    country: 'United Kingdom',
    city: 'London',
    street: {
      name: 'Long Acre',
      no: 999,
    }
  },
  name: 'maria',
};

export const theAnswerToLife = 42; // https://www.independent.co.uk/life-style/history/42-the-answer-to-life-the-universe-and-everything-2205734.html
