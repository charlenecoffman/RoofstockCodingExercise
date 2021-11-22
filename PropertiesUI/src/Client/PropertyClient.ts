/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.14.4.0 (NJsonSchema v10.5.2.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

export interface IClient {
  /**
   * @return Success
   */
  propertyAll(): Promise<PropertyResponse[]>;
  /**
   * @param body (optional)
   * @return Success
   */
  property(body: Property | undefined): Promise<void>;
}

export class Client implements IClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
    this.http = http ? http : <any>window;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  /**
   * @return Success
   */
  propertyAll(): Promise<PropertyResponse[]> {
    let url_ = this.baseUrl + "/Property";
    url_ = url_.replace(/[?&]$/, "");

    let options_ = <RequestInit>{
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processPropertyAll(_response);
    });
  }

  protected processPropertyAll(response: Response): Promise<PropertyResponse[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200) result200!.push(PropertyResponse.fromJS(item));
        } else {
          result200 = <any>null;
        }
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      });
    }
    return Promise.resolve<PropertyResponse[]>(<any>null);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  property(body: Property | undefined): Promise<void> {
    let url_ = this.baseUrl + "/Property";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_ = <RequestInit>{
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processProperty(_response);
    });
  }

  protected processProperty(response: Response): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200) {
      return response.text().then((_responseText) => {
        return;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      });
    }
    return Promise.resolve<void>(<any>null);
  }
}

export class Address implements IAddress {
  addressId?: number;
  address1?: string | undefined;
  address2?: string | undefined;
  city?: string | undefined;
  country?: string | undefined;
  county?: string | undefined;
  district?: string | undefined;
  state?: string | undefined;
  zipCode?: string | undefined;
  zipPlus4?: string | undefined;

  constructor(data?: IAddress) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.addressId = _data["addressId"];
      this.address1 = _data["address1"];
      this.address2 = _data["address2"];
      this.city = _data["city"];
      this.country = _data["country"];
      this.county = _data["county"];
      this.district = _data["district"];
      this.state = _data["state"];
      this.zipCode = _data["zipCode"];
      this.zipPlus4 = _data["zipPlus4"];
    }
  }

  static fromJS(data: any): Address {
    data = typeof data === "object" ? data : {};
    let result = new Address();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["addressId"] = this.addressId;
    data["address1"] = this.address1;
    data["address2"] = this.address2;
    data["city"] = this.city;
    data["country"] = this.country;
    data["county"] = this.county;
    data["district"] = this.district;
    data["state"] = this.state;
    data["zipCode"] = this.zipCode;
    data["zipPlus4"] = this.zipPlus4;
    return data;
  }
}

export interface IAddress {
  addressId?: number;
  address1?: string | undefined;
  address2?: string | undefined;
  city?: string | undefined;
  country?: string | undefined;
  county?: string | undefined;
  district?: string | undefined;
  state?: string | undefined;
  zipCode?: string | undefined;
  zipPlus4?: string | undefined;
}

export class PropertyResponse implements IPropertyResponse {
  propertyId?: number;
  yearBuilt?: number;
  listPrice?: number;
  monthlyRent?: number | undefined;
  readonly grossYield?: number | undefined;
  isSaved?: boolean;
  address?: Address;

  constructor(data?: IPropertyResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.propertyId = _data["propertyId"];
      this.yearBuilt = _data["yearBuilt"];
      this.listPrice = _data["listPrice"];
      this.monthlyRent = _data["monthlyRent"];
      (<any>this).grossYield = _data["grossYield"];
      this.isSaved = _data["isSaved"];
      this.address = _data["address"] ? Address.fromJS(_data["address"]) : <any>undefined;
    }
  }

  static fromJS(data: any): PropertyResponse {
    data = typeof data === "object" ? data : {};
    let result = new PropertyResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["propertyId"] = this.propertyId;
    data["yearBuilt"] = this.yearBuilt;
    data["listPrice"] = this.listPrice;
    data["monthlyRent"] = this.monthlyRent;
    data["grossYield"] = this.grossYield;
    data["isSaved"] = this.isSaved;
    data["address"] = this.address ? this.address.toJSON() : <any>undefined;
    return data;
  }
}

export interface IPropertyResponse {
  propertyId?: number;
  yearBuilt?: number;
  listPrice?: number;
  monthlyRent?: number | undefined;
  grossYield?: number | undefined;
  isSaved?: boolean;
  address?: Address;
}

export class Property implements IProperty {
  propertyId?: number;
  addressId?: number;
  yearBuilt?: number;
  listPrice?: number;
  monthlyRent?: number | undefined;
  address?: Address;

  constructor(data?: IProperty) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.propertyId = _data["propertyId"];
      this.addressId = _data["addressId"];
      this.yearBuilt = _data["yearBuilt"];
      this.listPrice = _data["listPrice"];
      this.monthlyRent = _data["monthlyRent"];
      this.address = _data["address"] ? Address.fromJS(_data["address"]) : <any>undefined;
    }
  }

  static fromJS(data: any): Property {
    data = typeof data === "object" ? data : {};
    let result = new Property();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["propertyId"] = this.propertyId;
    data["addressId"] = this.addressId;
    data["yearBuilt"] = this.yearBuilt;
    data["listPrice"] = this.listPrice;
    data["monthlyRent"] = this.monthlyRent;
    data["address"] = this.address ? this.address.toJSON() : <any>undefined;
    return data;
  }
}

export interface IProperty {
  propertyId?: number;
  addressId?: number;
  yearBuilt?: number;
  listPrice?: number;
  monthlyRent?: number | undefined;
  address?: Address;
}

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any }, result: any) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any }, result?: any): any {
  if (result !== null && result !== undefined) throw result;
  else throw new ApiException(message, status, response, headers, null);
}
