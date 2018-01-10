import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/containers/HomeCtn';
import AddCategory from './components/containers/AddCategoryCtn';
import EditCategory from './components/containers/EditCategoryCtn';
import Layout from './components/layout'


export const routes=
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/add' component={AddCategory} />
        <Route  path='/editcategory/:id' component={EditCategory} />
    </Layout>