import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { ConnectionProvider } from "./contexts/connection";
import { AppLayout } from "./components/Layout";

import { HomeView } from "./views";


export function Routes() {
    return (
        <HashRouter basename={"/"}>
            <ConnectionProvider>
            <AppLayout>
                <Switch>
                    <Route exact path="/" component={() => <HomeView />} />
                </Switch>
            </AppLayout>
            </ConnectionProvider>

        </HashRouter>
    )
}