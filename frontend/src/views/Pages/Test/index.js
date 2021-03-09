import React, { Component } from 'react'
import axios from 'axios';

export default class index extends Component {
    state = {
        todos: [],
        url : 'https://absensiapiendpoint.azurewebsites.net/api/absensi?CheckIn=2020-03'
      }
      componentDidMount() {
          const Header = {
            accept : '*/*'
          }
        axios({
            method: 'get',
            url: this.state.url,
            headers: Header,
          })
        .then((data) => {
          this.setState({ todos: data.data })
          console.log(this.state.todos)
        })
        .catch(console.log)
      }
        render() {

            return (
               <div className="container">
                <div className="col-xs-12">
                <h1>My Todos</h1>
                {this.state.todos.map((todo) => (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{todo.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                      { todo.username &&
                        <span>
                        Completed
                        </span>
                      }            
                      </h6>
                    </div>
                  </div>
                ))}
                </div>
               </div>
            );
          }
      }