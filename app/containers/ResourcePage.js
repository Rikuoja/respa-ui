import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';

import { fetchResource } from 'actions/resourceActions';
import ImagePanel from 'components/common/ImagePanel';
import ResourceDetails from 'components/resource/ResourceDetails';
import ResourceHeader from 'components/resource/ResourceHeader';
import NotFoundPage from 'containers/NotFoundPage';
import resourcePageSelector from 'selectors/containers/resourcePageSelector';
import {
  getAddressWithName,
  getDescription,
  getName,
  getPeopleCapacityString,
} from 'utils/DataUtils';

export class UnconnectedResourcePage extends Component {
  componentDidMount() {
    const { actions, id } = this.props;
    actions.fetchResource(id);
  }

  render() {
    const {
      date,
      id,
      isFetchingResource,
      isLoggedIn,
      resource,
      unit,
    } = this.props;
    const resourceName = getName(resource);

    if (_.isEmpty(resource) && !isFetchingResource) {
      return <NotFoundPage />;
    }

    return (
      <DocumentTitle title={`${resourceName} - Varaamo`}>
        <Loader loaded={!_.isEmpty(resource)}>
          <div className="resource-page">
            <ResourceHeader
              address={getAddressWithName(unit)}
              name={resourceName}
            />
            <LinkContainer to={`/resources/${id}/reservation?date=${date.split('T')[0]}`}>
              <Button
                bsSize="large"
                bsStyle="primary"
                className="responsive-button"
              >
                {isLoggedIn ? 'Varaa tila' : 'Varaustilanne'}
              </Button>
            </LinkContainer>
            <ResourceDetails
              capacityString={getPeopleCapacityString(resource.peopleCapacity)}
              description={getDescription(resource)}
              type={getName(resource.type)}
            />
            <ImagePanel
              altText={`Kuva ${resourceName} tilasta`}
              images={resource.images || []}
            />
          </div>
        </Loader>
      </DocumentTitle>
    );
  }
}

UnconnectedResourcePage.propTypes = {
  actions: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isFetchingResource: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  resource: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchResource,
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(resourcePageSelector, mapDispatchToProps)(UnconnectedResourcePage);
