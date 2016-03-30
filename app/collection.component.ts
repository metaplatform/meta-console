/*
 * META Console
 *
 * @author META Platform <www.meta-platform.com>
 * @license See LICENSE file distributed with this source code
 */

import {Component} from 'angular2/core';
import {ApiProvider} from 'meta-api-ng2/api';
import {ApiCollection} from 'meta-api-ng2/api';

@Component({
    selector: 'meta-api-test-collection',
    template: `
    	<table class="datagrid" [attr.loaded]="collection.loaded">
    		<thead>
    			<tr>
    				<th role="button" [class.current]="sortColumn == 'first_name'" (click)="sortBy('first_name')">First name</th>
    				<th role="button" [class.current]="sortColumn == 'last_name'" (click)="sortBy('last_name')">Last name</th>
    				<th role="button" [class.current]="sortColumn == 'email'" (click)="sortBy('email')">E-mail</th>
    				<th role="button" [class.current]="sortColumn == 'phone'" (click)="sortBy('phone')">Phone</th>
    			</tr>
    		</thead>
    		<tbody>
    			<tr *ngFor="#record of collection.records">
    				<td>{{record.first_name}}</td>
    				<td>{{record.last_name}}</td>
    				<td>{{record.email}}</td>
    				<td>{{record.phone}}</td>
    			</tr>
    		</tbody>
    		<tfoot>
    			<tr>
    				<td colspan="2">Showing {{collection.count}} of {{collection.total}} records.</td>
    				<td colspan="2" class="pages">
    					<span *ngFor="#page of collection.pages" (click)="collection.setPage(page)" [class.current]="collection.page == page" role="button">{{page + 1}}</span>
    				</td>
    			</tr>
    		</tfoot>
    	</table>
    `
})
export class CollectionTestComponent {
	
	private collection: ApiCollection;
	public sortColumn = null;
	public sortDir = 1;

	constructor(private provider: ApiProvider){

		this.collection = this.provider.getCollection("crm", "/customers");
	
		this.collection.init([ "first_name", "last_name", "email", "phone" ], { "city": "Písek" }, { last_name: 1 }, 5);

	}

	public sortBy(column: string){

		if(column == this.sortColumn){
			this.sortDir = (this.sortDir == -1 ? 1 : -1);
		} else {
			this.sortDir = 1;
			this.sortColumn = column;
		}

		var sort = {};
		sort[this.sortColumn] = this.sortDir;

		this.collection.setSort(sort);

	}

}