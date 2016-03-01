/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {Injectable} from 'angular2/core';
import {ApiProvider} from 'meta-api-ng2/api';

@Injectable()
export class ConsoleService {

	private channelSubscriptions = [];
	private queueSubscriptions = [];
	private log = [];

	constructor(private provider: ApiProvider){

	}

	/*
	 * GETTERS
	 */
	getChannelSubscriptions(){
		return this.channelSubscriptions;
	}

	getQueueSubscriptions(){
		return this.queueSubscriptions;
	}

	getLog(){
		return this.log;
	}

	/*
	 * LOGGING
	 */
	private addLog(requestType, requestUri, requestData){

		var record = {
			requestType: requestType,
			requestUri: requestUri,
			requestData: requestData,
			responseType: null,
			responseData: null
		};

		this.log.unshift(record);

		return record;

	}

	private handleMessage(type, uri, data){

		var record = this.addLog(type, uri, data);
		record.responseType = "success";
		record.responseData = null;

	}

	/*
	 * REQUESTS
	 */
	call(service, endpoint, method, params){

		var record = this.addLog("call", service + ":/" + endpoint + "@" + method, params);

		this.provider.client.call(service, endpoint, method, params).then((res) => {
			record.responseType = "response";
			record.responseData = res;
		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		});

	}

	subscribe(channel){
		
		var record = this.addLog("subscribe", channel, null);

		var handler = (msg) => {
			this.handleMessage("message", channel, msg);
		}

		this.provider.client.subscribe(channel, handler).then(() => {

			this.channelSubscriptions.push({
				channel: channel,
				cb: handler
			});

			record.responseType = "success";

		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

	unsubscribe(channelInstance){

		var i = this.channelSubscriptions.indexOf(channelInstance);

		if (i < 0) return;

		var record = this.addLog("unsubscribe", channelInstance.channel, null);

		this.provider.client.unsubscribe(channelInstance.channel, channelInstance.cb).then(() => {

			this.channelSubscriptions.splice(i, 1);

			record.responseType = "success";

		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		});

	}

	publish(channelName, message){

		var record = this.addLog("publish", channelName, message);

		this.provider.client.publish(channelName, message).then((res) => {
			record.responseType = "success";
			record.responseData = res;
			console.log("XXX", record);
		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

	subscribeQueue(queue) {

		var record = this.addLog("subscribe-queue", queue, null);

		var handler = (msg) => {
			this.handleMessage("queue-message", queue, msg);
			return Promise.resolve();
		}
		
		this.provider.client.subscribeQueue(queue, handler).then(() => {

			this.queueSubscriptions.push({
				queue: queue,
				cb: null
			});

			record.responseType = "success";

		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

	unsubscribeQueue(queueInstance) {

		var i = this.queueSubscriptions.indexOf(queueInstance);

		if (i < 0) return;

		var record = this.addLog("unsubscribe-queue", queueInstance.queue, null);

		this.provider.client.unsubscribeQueue(queueInstance.queue).then(() => {

			this.queueSubscriptions.splice(i, 1);
			
			record.responseType = "success";

		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		});

	}

	enqueue(queueName, message){

		var record = this.addLog("enqueue", queueName, message);

		this.provider.client.enqueue(queueName, message).then(() => {
			record.responseType = "success";
		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		});

	}

}