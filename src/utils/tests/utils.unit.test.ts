import { sortByKey, numberFormat, percentageFormat } from '../utils';
import projectList from './projectList.json';

describe('sortByKey', () => {
  it('sorts lists of objects with a default sort', () => {
    const sortOutput = projectList.sort(sortByKey());
    expect(JSON.stringify(sortOutput.map((obj) => obj.id))).toEqual('[4,6,7]');
  });

  it('sorts lists of objects by id', () => {
    const sortOutput = projectList.sort(sortByKey('id'));
    expect(JSON.stringify(sortOutput.map((obj) => obj.id))).toEqual('[4,6,7]');
  });

  it('sorts lists of objects by likes', () => {
    const sortOutput = projectList.sort(sortByKey('likes'));
    expect(JSON.stringify(sortOutput.map((obj) => obj.id))).toEqual('[4,7,6]');
  });

  it('sorts lists of objects by construction date', () => {
    const sortOutput = projectList.sort(
      sortByKey('construction_completed_date')
    );
    expect(JSON.stringify(sortOutput.map((obj) => obj.id))).toEqual('[7,6,4]');
  });
});

describe('numberFormat', () => {
  it('formats numbers for default locale', () => {
    expect(numberFormat(7)).toEqual('7');
    expect(numberFormat(7.3)).toEqual('7');
  });

  it('formats a number with decimals', () => {
    expect(numberFormat(7, 1)).toEqual('7,0');
    expect(numberFormat(7.3, 1)).toEqual('7,3');
  });

  it('formats a number using en locale', () => {
    expect(numberFormat(7, 1, 'en')).toEqual('7.0');
    expect(numberFormat(7.3, 1, 'en')).toEqual('7.3');
  });

  it("doesn't fail for invalid values", () => {
    expect(numberFormat(null)).toEqual('');
  });
});

describe('percentageFormat', () => {
  it('formats a number as a percentage', () => {
    // For the default German locale code, a non-breaking whitespace '\xa0' is
    // inserted as a separator, which is different from the white-space char
    // produced by writing ' '.
    expect(percentageFormat(0.5)).toEqual('50,0\xa0%');
    expect(percentageFormat(0.5012)).toEqual('50,1\xa0%');
  });

  it('formats numbers using provided locale', () => {
    expect(percentageFormat(0.5, 'en')).toEqual('50.0%');
  });

  it("doesn't fail for invalid values", () => {
    expect(percentageFormat(null)).toEqual('');
  });
});
