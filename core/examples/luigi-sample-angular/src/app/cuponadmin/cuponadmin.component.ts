import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-cuponadmin',
  templateUrl: './cuponadmin.component.html',
  styleUrls: ['./cuponadmin.component.css']
})
export class CuponadminComponent implements OnInit {

  constructor(private http: HttpClient) { }
  ngOnInit() {
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'text/html',
        'Authorization': 'Basic' +  btoa('admin:310b5678eece63336e4698d2722aad91')
      })
    };
    let obs = this.http.get('https://test-coupon-admin.scapp.io/',
    {
      headers: new HttpHeaders().set('Authorization', 'basic' + btoa("shahnaz@pragiti.com:Skhan@123")),
    });
    obs.subscribe(
        (response) => {
          alert('response' + response);
        },
        (error) => console.log(error)
      );
  }
}
