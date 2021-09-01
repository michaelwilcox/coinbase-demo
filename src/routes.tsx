import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { TickerProvider } from "./contexts/ticker";
import { AppLayout } from "./components/Layout";

import { HomeView } from "./views";


export function Routes() {
    return (
        <HashRouter basename={"/"}>
            <TickerProvider>
                <AppLayout>
                    <Switch>
                        <Route exact path="/" component={() => <HomeView />} />
                    </Switch>
                </AppLayout>
            </TickerProvider>
        </HashRouter>
    )
}