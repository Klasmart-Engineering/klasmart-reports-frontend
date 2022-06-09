import { useSetGlobalState, organizationMembershipStackState } from "@kl-engineering/frontend-state";
import { useEffect } from "react";

interface AppProviderProps {
}

const AppProvider: React.FC<AppProviderProps> = (props) => {

  const setOrganizations = useSetGlobalState(organizationMembershipStackState);

  useEffect(() => {
    setOrganizations([{ organization: { id: `a44da070-1907-46c4-bc4c-f26ced889439` } }]);
  }, [])

  return (
    <>
      {props.children}
    </>
  );
};

export default AppProvider;