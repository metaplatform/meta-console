/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {Component} from 'angular2/core';
import {ConsoleService} from './console.service';

declare var ace: any;

@Component({
    selector: 'meta-api-console-controller',
    template: `
    	<div class="section">
            <form (submit)="callService(callServiceName.value, callEndpoint.value, callMethod.value)">
        		<h2>RPC call</h2>
        		<p>
        			<input #callServiceName type="text" placeholder="Service" required="true" />
        			<input #callEndpoint type="text" placeholder="Endpoint" required="true" />
        			<input #callMethod type="text" placeholder="Method" required="true" />
        			<span class="editor" id="callParams">{}</span>
        		</p>
        		<p><button>Send</button></p>
            </form>
    	</div>

    	<div class="section">
    		<h2>Pub/Sub</h2>
            <form (submit)="service.subscribe(channelName.value); channelName.value=''">
    		    <p><input #channelName type="text" placeholder="Channel" /></p>
    		    <p><button>Subscribe</button></p>
            </form>

    		<ul class="items">
    			<li *ngFor="#channel of channelSubscriptions">{{channel.channel}} <span class="remove" title="Unsubscribe" (click)="service.unsubscribe(channel)"><i class="mdi mdi-close"></i></span></li>
    		</ul>

            <form (submit)="publishToChannel(publishChannelName.value)">
        		<p>
        			<input #publishChannelName type="text" placeholder="Channel" />
        			<span class="editor" id="channelMessage">{}</span>
        		</p>
        		<p><button>Publish</button></p>
            </form>
    	</div>

    	<div class="section">
    		<h2>Queue</h2>
            <form (submit)="service.subscribeQueue(queueName.value); queueName.value=''">
        		<p><input #queueName type="text" placeholder="Queue" /></p>
        		<p><button>Subscribe</button></p>
            </form>

    		<ul class="items">
    			<li *ngFor="#queue of queueSubscriptions">{{queue.queue}} <span class="remove" title="Unsubscribe" (click)="service.unsubscribeQueue(queue)"><i class="mdi mdi-close"></i></span></li>
    		</ul>    		<ul class="items"></ul>

            <form (submit)="publishToQueue(publishQueueName.value)">
        		<p>
        			<input #publishQueueName type="text" placeholder="Queue" />
        			<span class="editor" id="queueMessage">{}</span>
        		</p>
        		<p><button>Enqueue</button></p>
            </form>
    	</div>
    `
})
export class ControllerComponent {

	public channelSubscriptions;
	public queueSubscriptions;
	
	public paramsEditor: any;
	public channelEditor: any;
	public queueEditor: any;

	constructor(private service: ConsoleService) {

		this.channelSubscriptions = service.getChannelSubscriptions();
		this.queueSubscriptions = service.getQueueSubscriptions();

	}

	ngAfterContentInit() {

		this.paramsEditor = ace.edit("callParams");
		this.paramsEditor.setTheme("ace/theme/chrome");
		this.paramsEditor.getSession().setMode("ace/mode/json");

	    this.channelEditor = ace.edit("channelMessage");
		this.channelEditor.setTheme("ace/theme/chrome");
		this.channelEditor.getSession().setMode("ace/mode/json");

		this.queueEditor = ace.edit("queueMessage");
		this.queueEditor.setTheme("ace/theme/chrome");
		this.queueEditor.getSession().setMode("ace/mode/json");

	}

	callService(serviceName, endpoint, method){

		this.service.call(serviceName, endpoint, method, JSON.parse(this.paramsEditor.getValue()));

	}

	publishToChannel(channelName){

		this.service.publish(channelName, JSON.parse(this.channelEditor.getValue()));

	}

	publishToQueue(channelName) {

		this.service.enqueue(channelName, JSON.parse(this.queueEditor.getValue()));

	}

}