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
          offset: 0,
          heroku : 'https://cors-anywhere.herokuapp.com'
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
      url : 'http://localhost:4000/api/books'
      //url: this.state.heroku + '/https://dsc-undip-solution-challenge.et.r.appspot.com/api/books',
    })
      .then(data => {
        console.log(data)
        this.setState({
           results: data.data.response,
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
            
             {this.state.results.map(datas => 
                 <Card style={{marginLeft:'20px', display:'inline-block', maxWidth:'300px'}}>
                 <Card.Img style={{height:'200px'}} variant="top" src={datas.foto} />
                 <Card.Body>
                   <Card.Title>{datas.judul_buku}</Card.Title>
                   <Card.Text>
                     Penulis : {datas.penulis}<br />
                     Tahun Terbit : {datas.tahun_terbit} <br />
                     Penerbit : {datas.penerbit}<br />
                     jenis : {datas.jenis}<br />
                     jumlah : {datas.jumlah}
                   </Card.Text>
                 </Card.Body>
                 <Card.Footer>
                 <center> <button class="btn-info">Detail</button></center>
                 </Card.Footer>
               </Card>


               
               )}   
           
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
