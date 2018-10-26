import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-cuponadmin',
  templateUrl: './cuponadmin.component.html',
  styleUrls: ['./cuponadmin.component.css']
})
export class CuponadminComponent implements OnInit {

  constructor(private http: HttpClient) { }

  getCuponAdmin() {
    const url = 'http://localhost:8080/books';
    return this.http.get(url);
  }

  ngOnInit() {}

}
