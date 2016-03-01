/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {Component} from 'angular2/core';
import {ControllerComponent} from './controller.component';
import {LogComponent} from './log.component';

import {ConsoleService} from './console.service';

@Component({
    selector: 'meta-storage-console',
    template: `
    	<meta-storage-console-controller></meta-storage-console-controller>
    	<meta-storage-console-log></meta-storage-console-log>
    `,
    directives: [ControllerComponent, LogComponent],
    providers: [ConsoleService]
})
export class StorageConsoleComponent { }