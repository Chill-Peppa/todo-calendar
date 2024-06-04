import { BASE_URL } from '../utils/constants';

type THeaders = {
  readonly 'Content-Type': string;
};

interface IConstructor {
  url: string;
  headers: THeaders;
}

interface IApi<T> {
  readonly _url: string;
  readonly _headers: T;
}

export default class Api implements IApi<THeaders> {
  readonly _url: string;
  readonly _headers: THeaders;

  constructor({ url, headers }: IConstructor) {
    this._url = url;
    this._headers = headers;
  }

  _returnResponse(res: Response) {
    if (res.ok) {
      return res.text();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url: string, options: RequestInit) {
    return fetch(url, options).then(this._returnResponse);
  }

  getHolidays(currentYear: number, currentMonth: number) {
    return this._request(
      `${this._url}year=${currentYear}&month=${currentMonth + 1}`,
      {
        headers: this._headers,
      },
    );
  }
}

export const holidayApi = new Api({
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
