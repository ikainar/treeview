import React from "react";
import Container from "@material-ui/core/Container";

import { TreeList } from "./components/TreeList";

function App() {
  return (
    <React.Fragment>
      <Container>
        <TreeList />
      </Container>
    </React.Fragment>
  );
}

export default App;
