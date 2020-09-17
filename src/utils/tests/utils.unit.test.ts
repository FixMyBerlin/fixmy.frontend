import { sortByKey } from '../utils';
import projectList from './projectList.json';
import projectListSorted from './projectListSorted';

describe('sortByKey', () => {
  it('sorts lists of objects with a default sort', () => {
    const sortOutput = projectList.sort(sortByKey());
    expect(JSON.stringify(sortOutput.map((obj) => obj.id))).toEqual(
      JSON.stringify(projectListSorted.byId)
    );
  });

  it('sorts lists of objects by id', () => {
    const sortOutput = projectList.sort(sortByKey('id'));
    expect(JSON.stringify(sortOutput.map((obj) => obj.id))).toEqual(
      JSON.stringify(projectListSorted.byId)
    );
  });

  it('sorts lists of objects by likes', () => {
    const sortOutput = projectList.sort(sortByKey('likes'));
    expect(JSON.stringify(sortOutput.map((obj) => obj.id))).not.toEqual(
      JSON.stringify(projectListSorted.byLikes)
    );
  });

  it('sorts lists of objects by construction date', () => {
    const sortOutput = projectList.sort(
      sortByKey('construction_completed_date')
    );
    expect(JSON.stringify(sortOutput.map((obj) => obj.id))).not.toEqual(
      JSON.stringify(projectListSorted.byDate)
    );
  });
});
