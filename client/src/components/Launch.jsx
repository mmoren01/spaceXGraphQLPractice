import React, { Fragment } from 'react';
import {
  useQuery,
  gql
} from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
  query LaunchQuery($id: String!) {
    launch(id: $id) {
      flight_number,
      name,
      date_local,
      success,
      rocket
    }
  }
`;

const ROCKET_QUERY = gql`
  query RocketQuery($id: String!) {
    rocket(id: $id) {
      name
    }
  }
`;

const LaunchData = ({ id }) => {
  const { loading, error, data: launchData } = useQuery(LAUNCH_QUERY, { variables: { id: id }});
  const rocketId = launchData?.launch?.rocket;
  const { data: rocketData } = useQuery(ROCKET_QUERY, {skip: !rocketId,  variables: { id: rocketId }});
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);

    return <p>Oops Something Went Wrong...</p>
  }

  const { name, flight_number, date_local, success, rocket } = launchData.launch;
  // const { name,  }

  return(
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:</span> {name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Flight Number: {flight_number}</li>
        <li className="list-group-item">Date: {date_local}</li>
        <li className="list-group-item">Success:&nbsp;
          <span className={
            classNames({
              'text-success': success,
              'text-danger': !success,
            })
          }>
            {success ? 'Yes' : 'No'}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
        <ul className="my-3"></ul>
    </div>
  );
};

const Launch = () => {
  //USING useLocation hook to get URL properties
  const location = useLocation();
  let flight_id = location.pathname.slice(8);
  return (
    <Fragment>
      <LaunchData id={flight_id} />
    </Fragment>
  );
};

export default Launch;