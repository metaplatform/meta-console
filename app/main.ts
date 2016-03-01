/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {bootstrap}    		from 'angular2/platform/browser'
import {provide}           	from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './app.component'
import {ApiProvider} from 'meta-api-ng2/api';

bootstrap(AppComponent, [ROUTER_PROVIDERS, ApiProvider, provide(
	LocationStrategy,
	{ useClass: HashLocationStrategy }
)]);