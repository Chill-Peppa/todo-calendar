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

// Ключевое слово implements в TypeScript используется
// для указания того, что класс реализует определенный интерфейс.
export default class Api implements IApi<THeaders> {
  readonly _url: string;
  readonly _headers: THeaders;

  constructor({ url, headers }: IConstructor) {
    this._url = url;
    this._headers = headers;
  }

  //внутренний метод проверки ответа
  _returnResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //универсальный метод запроса с проверкой ответа
  _request(url: string, options: RequestInit) {
    return fetch(url, options).then(this._returnResponse);
  }

  //GET запрос с информацией о ингредиентах
  getHolidays(currentYear: number, currentMonth: number, i: number) {
    return this._request(
      `${this._url}year=${currentYear}&month=${currentMonth + 1}&day=${i}`,
      {
        headers: this._headers,
      },
    );
  }
}

//тут экземпляр класса
export const holidayApi = new Api({
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
