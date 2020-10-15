import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './AuthPage';
import { CreatePage } from './CreatePage';
import { DetailPage } from './DetailPage';
import { LinksPage } from './LinksPage';


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/links' exact>
                    <LinksPage />
                </Route>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage />
                </Route>
                <Redirect to='/create'></Redirect>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to='/'></Redirect>
        </Switch>
    )

}