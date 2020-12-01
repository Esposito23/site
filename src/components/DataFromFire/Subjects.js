import React, { Component } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import Fire from 'firebase'


createTheme('mioTema', {
  text: {
    primary: 'black',
  },
  background: {
    default: 'white',
  }
});

const nRows = 5
const bool = true


class App extends Component {
  constructor(props) {
    super()
    this.state = {
      users: []
    }
  }

  Stampa = (state) => {
    console.log(state.key)
  }

  componentWillMount() {
    this.getUsers()
  }

  getUsers() {
    var users = [];

    Fire.database().ref(`subjects/`).on('value' ,snapshot => {
      snapshot.forEach(snap => {
        users.push({
          name : snap.val().name,
          age : snap.val().age,
          gender : snap.val().gender,
          key : snap.key
        });

      })
      this.setState({users : users});
    })
  }


    
    
  
  render() {
      const columns =
        [
          {
            name: 'name',
            selector: 'name',
            sortable: true
          },
          {
            name: 'gender',
            selector: 'gender',
            sortable: true
          },
          {
            name: 'Eta',
            selector: 'age',
            sortable: true
          }
        ]

    return(
      <div>
    <div>
      <DataTable
        paginationComponentOptions={{ noRowsPerPage: true }}
        title="List Subjects"
        pagination={bool}
        paginationPerPage={nRows}
        theme="mioTema"
        data={this.state.users}
        columns={columns}
        expandableRows={bool}
        onRowClicked={this.Stampa}
        />
    </div>
      </div >
    )
  }
}

export default App