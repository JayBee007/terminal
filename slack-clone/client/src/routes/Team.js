import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateTeam from '../pages/team/CreateTeam';
import ViewTeam from '../pages/team/ViewTeam';


const Team = () => (
  <Switch>
    <Route path="/team/create-team" exact component={CreateTeam} />
    <Route path="/team/view-team" exact component={ViewTeam} />
  </Switch>
)



export default Team;
