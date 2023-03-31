import {getPersistedData, persistData} from '../src/model/persist-data.service';

type TestType = {
  prop1: string;
  prop2: number;
  prop3?: string;
  prop4?: string;
};

it('PersistData and getPersistedData', async () => {
  const data = {prop1: 'a string', prop2: 231};
  await persistData<TestType>('key1', data);

  expect(await getPersistedData<TestType>('key1')).toEqual(data);

  const data2 = {prop1: 'a string2', prop2: 123};
  await persistData<TestType>('key1', data2);

  expect(await getPersistedData<TestType>('key1')).toEqual(data2);

  const nullData = null;
  await persistData<null>('key2', nullData);

  expect(await getPersistedData<TestType>('key1')).toEqual(data2);
  expect(await getPersistedData<TestType>('key2')).toEqual(null);
});

it('getPersistedData', async () => {
  expect(await getPersistedData<TestType>('not a key')).toEqual(null);
  const data = {prop1: 'a string', prop2: 231};
  await persistData<TestType>('key', data);
  expect(await getPersistedData<TestType>('key')).toEqual(data);
});
