import { createContext } from "react";
import { Client, IClient } from "../Client/PropertyClient";

const ServiceContext = createContext<IClient | undefined>(new Client("https://localhost:44335"));

export default ServiceContext;
