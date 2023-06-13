import { Component, EventEmitter, Output } from '@angular/core';
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
export class HomeComponent {
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
  /// summary of the bindCSS function is to bind the css to the corresponding shape
  public bindCSS(){
    ///switch case for shape and applies corresponding css
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
        return {
          'width': '0',
          'height': '0',
          'border-left': (this.width / 2) + "px solid transparent",
          'border-right': (this.width / 2) + "px solid transparent",
          'border-bottom': this.height + ' solid #0d6efd'
        };
      case "pentagon":
        return {
          'width': '0',
          'height': '0',
          'border-bottom': this.height + ' solid #0d6efd',
          'border-left': this.width + ' solid transparent',
          'border-right': this.width + ' solid transparent',
          'transform': 'rotate(36deg)',
          'position': 'relative',
          'left': '-10px'
        };
      case "rectangle":
        return {
          'width': this.width + "px",
          'height': this.height  + "px",
          'background-color': '#0d6efd'
        };
      case "hexagon":
        return {
          'width': '0',
          'height': '0',
          'border-bottom': this.height + ' solid #0d6efd',
          'border-left': this.width + ' solid transparent',
          'border-right': this.width + ' solid transparent',
          'transform': 'rotate(90deg)',
          'position': 'relative',
          'left': '-10px'
        };
      case "heptagon":
        return {
          'width': '0',
          'height': '0',
          'border-bottom': this.height + ' solid #0d6efd',
          'border-left': this.width + ' solid transparent',
          'border-right': this.width + ' solid transparent',
          'transform': 'rotate(90deg)',
          'position': 'relative',
          'left': '-10px'
        };
      case "octagon":
        return {
          'width': '0',
          'height': '0',
          'border-bottom': this.height + ' solid #0d6efd',
          'border-left': this.width + ' solid transparent',
          'border-right': this.width + ' solid transparent',
          'transform': 'rotate(90deg)',
          'position': 'relative',
          'left': '-10px'
        };
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
        this.bindCSS();
      })
      .catch(rejected => {
          alert(rejected);
      });        
    }
    input="";
}


// •	Isosceles Triangle  	 
// • 	Square  
// •	Scalene Triangle  		
// •	Parallelogram  
// •	Equilateral Triangle  	 
// •	Pentagon  
// •	Rectangle 
// •	Hexagon  
// •	Heptagon  
// •	Octagon  
// •	Circle  	 
// •	Oval 
