/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {Component} from 'angular2/core';
import {ElementRef} from 'angular2/core';

declare var ace: any;

@Component({
    selector: 'meta-api-console-log-entry',
    template: `
		<div class="request">
			<header>
				<span class="type" [attr.msgtype]="entry.requestType">{{entry.requestType}}</span>
				<span class="uri">{{entry.requestUri}}</span>
			</header>
			<div class="output" [attr.id]="requestOutputId"></div>
	    </div>
        <div class="response" [attr.responded]="entry.responseType">
            <header>
                <span class="type" [attr.msgtype]="entry.responseType">{{entry.responseType}}</span>
            </header>
            <div class="output" [attr.id]="responseOutputId"></div>
            <p class="loading">Processing...</p>
        </div>
    `,
    inputs: [ "entry" ]
})
export class LogEntryComponent {

    public entry;

    private requestEditor = null;
    private responseEditor = null;

    public id;
    public requestOutputId;
    public responseOutputId;

    constructor(){
        
        this.id = (new Date()).getTime() + "_" + Math.round(Math.random() * 10000);
        this.requestOutputId = this.id + "-request";
        this.responseOutputId = this.id + "-response";

    }

    ngAfterViewChecked() {

        if(!this.requestEditor && this.entry.requestData){

            this.requestEditor = ace.edit(this.requestOutputId);
            this.requestEditor.setTheme("ace/theme/chrome");
            this.requestEditor.getSession().setMode("ace/mode/json");
            this.requestEditor.setReadOnly(true);
            this.requestEditor.setValue(JSON.stringify(this.entry.requestData, null, 2), -1)
            this.requestEditor.setOptions({
                maxLines: Infinity
            });

            this.requestEditor.getSession().foldAll();
            this.requestEditor.getSession().unfold(1, false);

        }

        if (!this.responseEditor && this.entry.responseData) {

            this.responseEditor = ace.edit(this.responseOutputId);
            this.responseEditor.setTheme("ace/theme/chrome");
            this.responseEditor.getSession().setMode("ace/mode/json");
            this.responseEditor.setReadOnly(true);
            this.responseEditor.setValue(JSON.stringify(this.entry.responseData, null, 2), -1)
            this.responseEditor.setOptions({
                maxLines: Infinity
            });

            this.responseEditor.getSession().foldAll();
            this.responseEditor.getSession().unfold(1, false);

        }

    }

}