import { createContext } from "react";
import PropertyStore, { IPropertyStore } from "../Stores/PropertyStore";

const StoreContext = createContext<IPropertyStore>(new PropertyStore());

export default StoreContext;
