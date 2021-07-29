import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const LaunchItem = (props) => {
  const {date_local, name, success, id } = props.launch;
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Mission: <span className={classNames({
            'text-success': success,
            'text-danger': !success
          })}>{ name }</span></h4>
          <h5>Date:
            <Moment format="MM/DD/YYYY HH:mm">
              { date_local }
            </Moment>
          </h5>
        </div>
        <div className="col-md-3">
          <Link to={`/launch/${id}`}className="btn btn-secondary">Launch Details</Link>
        </div>
      </div>
    </div>
  );
};

export default LaunchItem;