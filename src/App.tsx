import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IAppData, IAppInputData } from "./types";
import { emailsSettingsActions } from "./store/debuilder-data/emailsSettingsSlice";
import { Alert, AlertTitle, Typography } from "@mui/material";
import { Wrapper } from "./components/Wrapper";
import useGetFromAPI from "./hooks/useGetFromAPI";

interface IAppProps {
  inputData: IAppInputData;
}

/**
 * data loader
 * @param {IAppInputData} inputData input data used to load settings
 * @returns 
 */
function App({ inputData }: IAppProps) {
  const dispatch = useDispatch();

  // const { error, data } = useGetFromAPI<IAppData>(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings");
  const { error, data } = useGetFromAPI<IAppData>("http://localhost:5000/settings");

  const [proceed, setProceed] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      dispatch(emailsSettingsActions.initialize({ urls: data }));
      setProceed(true);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, dispatch]);

  return (
    <Fragment>
      {/* if data loaded */}
      {proceed && <Wrapper />}
      {/* Can't load settings */}
      {error &&
        <Alert variant="standard" color="error">
          <AlertTitle>{error.code}</AlertTitle>
          <Typography variant="body1">{error.codeText}</Typography>
          <Typography variant="subtitle1">{error.url}</Typography>
        </Alert>
      }
    </Fragment>
  );
}

export default App;
