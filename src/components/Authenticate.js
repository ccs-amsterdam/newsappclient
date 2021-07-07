import React, { useEffect } from "react";

import db from "../apis/dexie";
import { useHistory } from "react-router-dom";
import { Grid, Button, Header, Segment } from "semantic-ui-react";
import background from "../images/background.jpg";

const Authenticate = ({ items }) => {
  const history = useHistory();

  const authenticate = async (checkAuth) => {
    if (checkAuth) {
      const isAuthenticated = await db.isAuthenticated();
      if (!isAuthenticated) return null;
    }
    try {
      await db.authenticate();
      history.push(items[0].path);
    } catch (e) {}
  };

  useEffect(() => {
    authenticate(true);
  });

  return (
    <Grid
      inverted
      textAlign="center"
      style={{
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "100% 100%",
      }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 600 }}>
        <Segment style={{ border: 0 }}>
          <Header as="h2">News experiment platform</Header>
          <p align="justified">
            This is a placeholder for an authentication screen. We probably want users to either
            login to a server here, and also support sending users a link that contains a token to
            skip this step.
          </p>
          <Button primary onClick={() => authenticate(false)}>
            Magic authentication button
          </Button>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Authenticate;
