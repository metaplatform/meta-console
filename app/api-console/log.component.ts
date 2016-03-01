/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {Component} from 'angular2/core';
import {ElementRef} from 'angular2/core';
import {ConsoleService} from './console.service';

import {LogEntryComponent} from './logEntry.component';

declare var ace: any;

@Component({
    selector: 'meta-api-console-log',
    template: `
		<meta-api-console-log-entry *ngFor="#entry of log" [entry]="entry"></meta-api-console-log-entry>
    `,
    directives: [LogEntryComponent]
})
export class LogComponent {

	public log;

	constructor(private service: ConsoleService, private elementRef: ElementRef) {

		this.log = service.getLog();

	}

}