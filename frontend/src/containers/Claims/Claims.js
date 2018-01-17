import React, { Component } from 'react';
// import client from '../../helpers/ApiClient';
import { Table } from 'react-bootstrap';

export default class Claims extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claims: {
        meta: {
          total: 1
        },
        resources: [
          {
            id: 172,
            user: {
              first_name: 'Bruce',
              last_name: 'Wayne'
            },
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer libero velit, tempus eget diam laoreet, rhoncus volutpat ipsum. In auctor pulvinar eros eget vulputate. Mauris pretium non augue a venenatis. Sed eu malesuada turpis. Curabitur egestas purus sit amet luctus lobortis. Proin eu odio eu leo ultricies placerat. Nulla tortor mi, sodales vitae eros vitae, accumsan sollicitudin tortor. Vivamus id semper ligula, id cursus dolor. Quisque ut malesuada arcu. Quisque ac viverra mi. Mauris eu pharetra diam.'
          }
        ]
      }
    };
  }

  componentDidMount() {
    // client.get('/claims')
    //   .then(response => this.setState({
    //     claims: response
    //   }));
  }

  render() {
    const { claims } = this.state;
    const table = claims.resources.length > 0 && <Table striped bordered condensed hover>
      <thead>
      <tr>
        <td>id</td>
        <td>На кого создана</td>
        <td>Описание</td>
      </tr>
      </thead>
      <tbody>
      {claims.resources.map((claim, idx) =>
        <tr key={idx}>
          <td>{claim.id}</td>
          <td>{claim.user.first_name + '' + claim.user.last_name}</td>
          <td>{claim.description}</td>
        </tr>
      )}
      </tbody>
    </Table>;
    return (
      <div>
        <h3>Мои жалобы</h3>
        { table }
        { claims.resources.length < 1 && <h4 className="text-center">Вы не подали ни одной жалобы</h4> }
      </div>
    );
  }
}
