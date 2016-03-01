/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {createSecretCredentials, createBasicCredentials} from 'meta-api-ng2/api';
import {ApiProvider} from 'meta-api-ng2/api';
import {NavComponent} from './nav.component';

import {ConsoleComponent} from './api-console/main.component';
import {StorageConsoleComponent} from './storage-console/main.component';

import {CollectionTestComponent} from './collection.component';

@Component({
    selector: 'meta-console',
    template: `
    	<!-- nav -->
        <meta-console-nav></meta-console-nav>
        <div id="view">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [NavComponent, ROUTER_DIRECTIVES],
    providers: [ApiProvider]
})
@RouteConfig([
    { path: '/console', name: 'ApiConsole', component: ConsoleComponent, useAsDefault: true },
    { path: '/storage', name: 'StorageConsole', component: StorageConsoleComponent },
    { path: '/test-collection', name: 'CollectionTest', component: CollectionTestComponent },
])
export class AppComponent {

    constructor(private api: ApiProvider){

        this.api.connect("127.0.0.1:8080", createBasicCredentials("admin", "admin"));
        //this.api.connect("ws://127.0.0.1:5010/ws", createSecretCredentials("client", "client"));

    }

}