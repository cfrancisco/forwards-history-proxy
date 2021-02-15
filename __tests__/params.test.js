const { createDataToBePassed } = require('../src/proxy');
const validationHandler = require('../src/handlers/validation');

const CASE_ONE = 'caseOne';
const CASE_TWO = 'caseTwo';
const CASE_THREE = 'caseThree';
const CASE_FOUR = 'caseFour';

const EXPECTED_DEFAULT =
{
  deviceId: 'a1b1c1',
  attr: 'temperature',
  dateFrom: '1970-01-01T00:00:00.000Z',
  dateTo: (new Date().toISOString()).split('.')[0],
  order: 'desc',
  rawResponse: '',
  limit: 999,
  headers: undefined,
};

const cases = {
  caseOne: {
    request: {
      params: {
        deviceId: 'a1b1c1',
      },
      query: {
        attr: 'temperature',
      },
    },
    expected:
    {
      ...EXPECTED_DEFAULT,
    },
  },
  caseTwo: {
    request: {
      params: {
        deviceId: 'a1b1c1',
      },
      query: {
        attr: 'temperature',
        lastN: 100,
      },
    },
    expected:
    {
      ...EXPECTED_DEFAULT,
      limit: 100,
      order: 'desc',
    },
  },
  caseThree: {
    request: {
      params: {
        deviceId: 'a1b1c1',
      },
      query: {
        attr: 'temperature',
        lastN: 200,
        dateFrom: '2021-01-01T09:00:00.000Z',
      },
    },
    expected:
    {
      ...EXPECTED_DEFAULT,
      limit: 200,
      order: 'desc',
      dateFrom: '2021-01-01T09:00:00.000Z',
    },
  },
  caseFour: {
    request: {
      params: {
        deviceId: 'a1b1c1',
      },
      query: {
        attr: 'temperature',
        firstN: 50,
        dateTo: '2021-02-02T12:00:00.000Z'.split('.')[0],
        dateFrom: '2021-01-01T09:00:00.000Z',
      },
    },
    expected:
    {
      ...EXPECTED_DEFAULT,
      limit: 50,
      order: 'asc',
      dateTo: '2021-02-02T12:00:00.000Z'.split('.')[0],
      dateFrom: '2021-01-01T09:00:00.000Z',
    },
  },
};

describe('Testing incoming params and outcoming params', () => {
  it('testing only passing attribute', async () => {
    const paramList = cases[CASE_ONE].request;
    const data = createDataToBePassed(paramList);
    const result = await validationHandler.handle(data);
    const dateTo = result.dateTo.split('.')[0]; // removing ms to checking
    expect({ ...result, dateTo }).toEqual(cases[CASE_ONE].expected);
  });

  it('testing passing attribute and lastN', async () => {
    const paramList = cases[CASE_TWO].request;
    const data = createDataToBePassed(paramList);
    const result = await validationHandler.handle(data);
    const dateTo = result.dateTo.split('.')[0]; // removing ms to checking
    expect({ ...result, dateTo }).toEqual(cases[CASE_TWO].expected);
  });

  it('testing passing dateTo and lastN', async () => {
    const paramList = cases[CASE_THREE].request;
    const data = createDataToBePassed(paramList);
    const result = await validationHandler.handle(data);
    const dateTo = result.dateTo.split('.')[0]; // removing ms to checking

    expect({ ...result, dateTo }).toEqual(cases[CASE_THREE].expected);
  });

  it('testing passing dateTo, dateFrom and firstN', async () => {
    const paramList = cases[CASE_FOUR].request;
    const data = createDataToBePassed(paramList);
    const result = await validationHandler.handle(data);
    const dateTo = result.dateTo.split('.')[0]; // removing ms to checking
    expect({ ...result, dateTo }).toEqual(cases[CASE_FOUR].expected);
  });
});
