import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateTeam from '../pages/Team/CreateTeam';
import ViewTeam from '../pages/Team/ViewTeam';


const Team = () => (
  <Switch>
    <Route path="/team/create-team" exact component={CreateTeam} />
    {/* <Route path="/team/view-team/user/:teamId/:userId" component={ViewTeam} /> */}
    {/* <Route path="/team/view-team/:teamId?/:channelId?" component={ViewTeam} /> */}
    <Route path="/team/view-team" component={ViewTeam} />
  </Switch>
)



export default Team;
