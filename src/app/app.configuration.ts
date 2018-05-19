import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'http://localhost:8080/';
    public api = 'api/v1';
    public apiUrl = this.server + this.api;
}
