interface AppProviderProps {
}

const AppProvider: React.FC<AppProviderProps> = (props) => {

  return (
    <>
      {props.children}
    </>
  );
};

export default AppProvider;
