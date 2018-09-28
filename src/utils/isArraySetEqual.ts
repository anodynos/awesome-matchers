import * as _ from 'lodash';

const isArraySetEqual = (
  ar1: any[],
  ar2: any[],
  comparator1?: (a: any, b: any) => boolean,
  comparator2?: (a: any, b: any) => boolean,
) => {
  if (!comparator1) comparator1 = (a, b) => a === b;
  if (!comparator2) comparator2 = _.flip(comparator1);
  
  return ar1.length === ar2.length &&
  _.isEmpty(_.differenceWith(ar1, ar2, comparator1 as any)) &&
  _.isEmpty(_.differenceWith(ar2, ar1, comparator2 as any));
};

export default isArraySetEqual;
