import moment from "moment";

export const flushPromises = () => {
  new Promise((resolve) => setImmediate(resolve));
};

export const makeArray = <T>(maker: () => T, count: number): T[] => {
  const array: T[] = [];

  for (let i = 0; i < count; i++) {
    array.push(maker());
  }

  return array;
};

export class Any {
  public RandomBoolean = () => Math.random() >= 0.5;

  public RandomInt(min = 0, max = 10000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + 1);
  }

  public readonly RandomString = (length = 10) => this.RandomFrom("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", length);

  readonly RandomFrom = (characters: string, length: number) =>
    this.Range(length)
      .map((i) => this.CharAtRandom(characters))
      .join("");

  readonly CharAtRandom = (characters: string) => characters.charAt(Math.floor(Math.random() * characters.length));

  readonly Range = (length: number, startAt = 0) => Array.from(Array(length).keys()).map((i) => i + startAt);

  private RandomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map((n) => Number.parseInt(n))
      .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }

  readonly RandomDate = (minYear: number, maxYear: number) => moment([this.RandomInt(minYear, maxYear)]).toDate();
}

const AnyLibrary = new Any();
export default AnyLibrary;
