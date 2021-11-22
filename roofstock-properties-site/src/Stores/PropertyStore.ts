import { observable, action, makeAutoObservable } from "mobx";
import { Property, PropertyResponse } from "../Client/PropertyClient";

export interface IPropertyStore {
  properties: PropertyResponse[];
  updateProperty: (property: Property) => void;
  insertPropertiesCollection: (properties: PropertyResponse[]) => void;
}

export default class PropertyStore implements IPropertyStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable public properties: PropertyResponse[] = [];

  @action
  public insertPropertiesCollection = (properties: PropertyResponse[]) => {
    this.properties = properties;
  };

  @action
  public updateProperty = (propertyToUpdate: PropertyResponse) => {
    var propertyIndex = this.properties.findIndex((p) => p.propertyId === propertyToUpdate.propertyId);
    this.properties[propertyIndex].isSaved = propertyToUpdate.isSaved;
  };
}
