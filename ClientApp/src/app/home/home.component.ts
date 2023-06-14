import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent{
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  
  constructor(private http: HttpClient) {

  }
  /// initialize variables
  shape = "";
  width = 0;
  height = 0;
  radius = 0;
  length = 0;

  /// summary of the bindShape function is to bind the shape, width, height, radius, and length to the corresponding values from the server
  /// @param event is the object that is returned from the server
  public bindShape(event: any) {
    if(event.shape != null || undefined){
      this.shape = event.shape;
    }
    if(event.width != null || undefined){
      this.width = event.width;
    }
    if(event.height != null || undefined){
      this.height = event.height;
    }
    if(event.radius != null || undefined){
      this.radius = event.radius;
    }
    if(event.length != null || undefined){
      this.length = event.length;
    }
  }
  /// summary of the bindCSSorCanvas function is to bind the css / canvas to the corresponding shape
  public bindCSSorCanvas(){
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    ///clear canvas
    context.fillStyle = 'red';
    context.fill();
    context.clearRect(0, 0, canvas.width, canvas.height);    
    ///switch case for shape and applies corresponding css or canvas code
    switch(this.shape){
      case "isosceles triangle":
        return{
          'width': 0,
          'height': 0,
          'border-right': (this.width / 2) + "px solid transparent",
          'border-bottom': this.height + "px solid #0d6efd",
          'border-left': (this.width / 2) + "px solid transparent"    
        };
      case "square":
        return {
          'width': this.length + "px",
          'height': this.length + "px",
          'background-color': '#0d6efd'
        };
      case "scalene triangle":
        return {
          'width': 0,
          'height': 0,
          'border-left': (this.width * 0.75) + 'px solid transparent',
          'border-right': (this.width * 0.25) + 'px solid transparent',
          'border-bottom': this.height + 'px solid #0d6efd'
        };
      case "parallelogram":
        return {
          'width': this.width + "px",
          'height': this.height + "px",
          'background-color': '#0d6efd',
          'transform': 'skewX(20deg)'
        };
      case "equilateral triangle":
        var h = this.length * (Math.sqrt(3)/2);
        context.translate(canvas.width / 2, canvas.height / 2);
        context.beginPath();
        context.moveTo(0, -h / 2);
        context.lineTo( -this.length / 2, h / 2);
        context.lineTo(this.length / 2, h / 2);
        context.lineTo(0, -h / 2);
        context.stroke();
        context.fill();      
        return;
      case "pentagon":
        context.beginPath();
        const a1 = 2 * Math.PI / 5;
        const r1 = this.length;        
        for (var i = 0; i < 6; i++) {
          context.lineTo(300 + r1 * Math.cos(a1 * i), 300 + r1 * Math.sin(a1 * i));
        }
        context.fill(); 
        context.closePath();
        context.stroke();         
        return;
      case "rectangle":
        return {
          'width': this.width + "px",
          'height': this.height  + "px",
          'background-color': '#0d6efd'
        };
      case "hexagon":
        context.beginPath();
        const a = 2 * Math.PI / 6;
        const r = this.length;        
        for (var i = 0; i < 6; i++) {
          context.lineTo(300 + r * Math.cos(a * i), 300 + r * Math.sin(a * i));
        }
        context.fill(); 
        context.closePath();
        context.stroke();        
        return;
      case "heptagon":
        var numberOfSides = 7,
            size = this.length,
            Xcenter = canvas.width / 2,
            Ycenter = canvas.height / 2;

        context.beginPath();
        context.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

        for (var i = 1; i <= numberOfSides;i += 1) {
          context.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
        }

        context.fill(); 
        context.strokeStyle = "#000000";
        context.lineWidth = 1;
        context.stroke();        
        return;
      case "octagon":
      var numberOfSides = 6;
          var size = this.length;
          var Xcenter = canvas.width / 2;
          var Ycenter = canvas.height / 2;

      context.beginPath();
      context.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

      for (var i = 1; i <= numberOfSides; i += 1) 
      {
          context.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
      }

      context.fill(); 
      context.strokeStyle = "#000000";
      context.lineWidth = 1;
      context.stroke();     
        return;
      case "circle":
        return{
          'width': this.radius + "px",
          'height': this.radius + "px",
          'border-radius': '50%',
          'background-color': '#0d6efd'
        }
      case "oval":
        return {
          'width': this.width + "px",
          'height': this.height + "px",
          'border-radius': '50%',
          'background-color': '#0d6efd'
        };
      default:
        return {
          
        }
    }
  }

  public submit(){
    ///reset values
    this.shape = "";
    this.width = 0;
    this.height = 0;
    this.radius = 0;
    this.length = 0;


    /// summary of the fetch function is to send the string to the server and receive the shape object back with the key values
    fetch('https://localhost:44420/shapegenerator/Input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.input)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.bindShape(data);
        this.bindCSSorCanvas();
      })
      .catch(rejected => {
          alert(rejected);
      });        
    }
    input="";
}
