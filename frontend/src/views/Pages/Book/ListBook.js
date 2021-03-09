import React, { Component, Suspense } from 'react';
import {Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { Card, CardGroup} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../../_nav';
// routes config
import routes from '../../../routes';

const DefaultAside = React.lazy(() =>
  import('../../../containers/DefaultLayout/DefaultAside')
);
const DefaultFooter = React.lazy(() =>
  import('../../../containers/DefaultLayout/DefaultFooter')
);
const DefaultHeader = React.lazy(() =>
  import('../../../containers/DefaultLayout/DefaultHeader')
);

class ListBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
          results: [],
          perPage: 10,
          currentPage: 0,
          offset: 0
        };
      }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.history.push('/login');
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};


  componentDidMount() {

    axios({
      method: 'get',
      url: 'https://reqres.in/api/users?page=2&&_limit=2',
    })
      .then(data => {
        console.log(data.data.data)
        this.setState({
           results: data.data.data,
          loading: true,
        });
      })
     
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
              <CardGroup>
             {this.state.results.map(datas => 
                 <Card style={{marginLeft:'20px'}}>
                 <Card.Img style={{height:'200px'}} variant="top" src={datas.avatar} />
                 <Card.Body>
                   <Card.Title>{datas.title}</Card.Title>
                   <Card.Text>
                     This is a wider card with supporting text below as a natural lead-in to
                     additional content. This card has even longer content than the first to
                     show that equal height action.
                   </Card.Text>
                 </Card.Body>
                 <Card.Footer>
                   <small className="text-muted">Last updated 3 mins ago</small>
                 </Card.Footer>
               </Card>


               
               )}   
             </CardGroup>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}

                 
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default ListBook;
