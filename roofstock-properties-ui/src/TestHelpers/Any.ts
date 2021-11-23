import moment from "moment";
import { Address, PropertyResponse } from "../Client/PropertyClient";

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

  public readonly RandomIntWithPercision = (precision = 100) => {
    return Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
  };

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

  public RandomAddress = () =>
    new Address({
      address1: this.RandomString(),
      address2: this.RandomString(),
      city: this.RandomString(),
      state: this.RandomString(),
    });
  public RandomPropertyResponse = () =>
    new PropertyResponse({
      address: this.RandomAddress(),
      propertyId: this.RandomInt(),
      yearBuilt: this.RandomInt(),
      listPrice: this.RandomIntWithPercision(100),
      grossYield: this.RandomIntWithPercision(100),
      monthlyRent: this.RandomIntWithPercision(100),
      isSaved: this.RandomBoolean(),
    });
}

const AnyLibrary = new Any();
export default AnyLibrary;
