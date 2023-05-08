import React from "react";
import { Segment, Grid, Header } from "semantic-ui-react";
import { AuthProvider } from "../contexts/auth-context";
import { ErrorCatcher } from "../components/error-catcher";

function Home() {
  return (
    <Grid>
      <Grid.Column>
        <Segment raised>
          <ErrorCatcher message="An error occured. Please notify the developers,">
            <Header as="h1">ZUoS Frontend</Header>
            <AuthProvider>
            </AuthProvider>
          </ErrorCatcher>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Home;
