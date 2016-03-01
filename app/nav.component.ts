/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'meta-console-nav',
    template: `
    	<nav id="nav">
    		<ul>
    			<li><a [routerLink]="['ApiConsole']"><i class="mdi mdi-console"></i></a></li>
                <li><a [routerLink]="['StorageConsole']"><i class="mdi mdi-database"></i></a></li>
    			<li><a [routerLink]="['CollectionTest']"><i class="mdi mdi-view-list"></i></a></li>
    		</ul>
    	</nav>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class NavComponent { }