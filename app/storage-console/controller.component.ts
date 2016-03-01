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
    selector: 'meta-storage-console-controller',
    template: `
    	<div class="section">
            <form (submit)="service.write(uploadBucket.value, null, uploadFiles.files)">
        		<h2>Upload files</h2>
        		<p>
        			<input #uploadBucket type="text" placeholder="Bucket" required="true" />
        			<input #uploadFiles type="file" placeholder="Endpoint" required="true" multiple />
        		</p>
        		<p><button>Upload</button></p>
            </form>
    	</div>

    	<div class="section">
    		<h2>Bucket</h2>

            <form>
                <p>
                    <input #bucketName type="text" placeholder="Bucket name" />
                    <input #objectId type="text" placeholder="Object ID" />
                    <input #objectFile type="file" placeholder="Endpoint" required="true" />
                </p>
                <p>
                    <button type="button" (click)="service.get(bucketName.value, objectId.value)">Get</button>
                    <button type="button" (click)="service.getUrl(bucketName.value, objectId.value)">Get URL</button>
                    <button type="button" (click)="service.getMeta(bucketName.value, objectId.value)">Get meta</button>
                    <button type="button" (click)="service.write(bucketName.value, objectId.value, objectFile.files)">Write</button>
                    <button type="button" (click)="service.delete(bucketName.value, objectId.value)">Delete</button>
                </p>
                <p>
                    <button type="button" (click)="service.listObjects(bucketName.value)">List objects</button>
                    <button type="button" (click)="service.listBuckets()">List buckets</button>
                </p>
            </form>


    	</div>
    `
})
export class ControllerComponent {

	constructor(private service: ConsoleService) {

	}

}