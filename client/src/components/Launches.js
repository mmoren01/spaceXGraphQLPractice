import React, { Fragment } from 'react';
import {
  useQuery,
  gql
} from '@apollo/client';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery{
    launches {
      flight_number,
      name,
      date_local,
      success,
      rocket,
      id
    }
  }
`;

const LaunchesData = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Oops... Something went wrong</p>;
  }

  return (
  <Fragment>
    {data.launches.map((launch) => <LaunchItem key={launch.id} launch={launch} />)}
  </Fragment>)
};

const Launches = () => (
  <h1 className="display-4 my-3">
    Launches
    <MissionKey />
    <LaunchesData />
  </h1>
);

export default Launches;
