import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  texts: any[];
  photos: any[];
  image: any[];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.service.getText()
      // .subscribe(texts => this.texts = texts);
      .subscribe(texts => {
        this.texts = texts;
        console.log(texts);        
      })

    this.service.getClouds()
      .subscribe(clouds => {
        this.photos = clouds;
        console.log(this.photos);
        this.image = this.photos[0].image[0];
        console.log(this.image);
        
      })

    
  }

}
