import NCSelect from "@common-components/NCSelect/NCSelect";
import { API_BASEURL, ENDPOINTS } from "@config/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { fetchOptions } from "@store-app/actions/options";
import { useAppDispatch, useAppSelector } from "@store-app/hooks";
import React from "react";

const App: React.FC = () => {
  const { options, isLoading, error } = useAppSelector(
    (state) => state.optionsData
  );
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    console.log(ENDPOINTS.test, API_BASEURL);
    dispatch(fetchOptions(OC.generateUrl(API_BASEURL + ENDPOINTS.test)));
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div id="app-navigation">left lateral menu</div>
      <div
        id="app-content"
        className={"full"}
        style={{ display: "inline-block" }}
      >
        <div
          className={"full"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && (
            <Typography component="h2" variant="caption">
              Something went wrong
            </Typography>
          )}
          <div id="main-content">
            <NCSelect
              dataURL={"http://localhost:8083/apps/opbridge/test"}
              onSelectCallback={(key, item) => {
                console.log("Selected Key:", key);
                console.log("Selecte Option", item);
              }}
            />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <NCSelect
                dataArray={options}
                onSelectCallback={(key, item) => {
                  console.log("Selected Key:", key);
                  console.log("Selecte Option", item);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div id="app-sidebar" style={{ maxWidth: "350px" }}>
        right sidebar
      </div>
    </div>
  );
};

export default App;
