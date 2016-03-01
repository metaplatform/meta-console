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

	private log = [];

	constructor(private provider: ApiProvider){

	}

	/*
	 * GETTERS
	 */
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
			responseData: null,
			responseUrl: null
		};

		this.log.unshift(record);

		return record;

	}

	/*
	 * REQUESTS
	 */
	write(bucket: string, objectId: string = null, files: FileList) {

		var fileList = [];

		for (var f = 0; f < files.length; f++)
			fileList.push(files[f].name);

		var record = this.addLog("write", "/" + bucket + ( objectId ? "/" + objectId : "" ), fileList);

		this.provider.storage.write(bucket, objectId, files).then((res) => {

			record.responseType = "response";
			record.responseData = res;

		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

	get(bucket: string, objectId: string){

		var record = this.addLog("get", "/" + bucket + "/" + objectId, {});

		this.provider.storage.get(bucket, objectId, true).then((res) => {
			
			record.responseType = "response";
			record.responseData = res;
			record.responseUrl = this.provider.storage.getUrl(bucket, objectId);

		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

	getUrl(bucket: string, objectId: string) {

		var record = this.addLog("get-url", "/" + bucket + "/" + objectId, {});

		var url = this.provider.storage.getUrl(bucket, objectId);

		record.responseType = "response";
		record.responseData = url;

	}

	getMeta(bucket: string, objectId: string) {

		var record = this.addLog("meta", "/" + bucket + "/" + objectId, {});

		this.provider.storage.getMeta(bucket, objectId).then((res) => {
			record.responseType = "response";
			record.responseData = res;
		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

	delete(bucket: string, objectId: string) {

		var record = this.addLog("delete", "/" + bucket + "/" + objectId, {});

		this.provider.storage.delete(bucket, objectId).then((res) => {
			record.responseType = "response";
			record.responseData = res;
		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

	listObjects(bucket: string) {

		var record = this.addLog("list-objects", "/" + bucket, {});

		this.provider.storage.listObjects(bucket).then((res) => {
			record.responseType = "response";
			record.responseData = res;
		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

	listBuckets() {

		var record = this.addLog("list-buckets", "/", {});

		this.provider.storage.listBuckets().then((res) => {
			record.responseType = "response";
			record.responseData = res;
		}, (err) => {
			record.responseType = "error";
			record.responseData = err.toString();
		})

	}

}