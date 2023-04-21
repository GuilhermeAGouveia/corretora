import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { ConfigValues } from "../components/Page/lista/Actions/ShowListConfigs";

interface ListConfigValue {
  configs: ConfigValues;
  setConfigsAndSave: (configs: ConfigValues) => void;
}

const ListConfig = createContext({} as ListConfigValue);

export default ListConfig;

export function ListConfigProvider({ children }: any) {
  const [configs, setConfigs] = useState<ConfigValues>({
    showOwner: false,
    listType: "page",
  });

  useEffect(() => {
    const configs = localStorage.getItem("configs");
    if (configs) {
      setConfigs(JSON.parse(configs));

    }
  }, []);

  const setConfigsAndSave = (configs: ConfigValues) => {
    setConfigs(configs);
    localStorage.setItem("configs", JSON.stringify(configs));
  }

  return (
    <ListConfig.Provider
      value={{
        configs,
        setConfigsAndSave
      }}
    >
      {children}
    </ListConfig.Provider>
  );
}

export function useListConfigs() {
  const context = useContext(ListConfig);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
