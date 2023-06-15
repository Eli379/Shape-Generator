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
  // initialize variables
  shape = "";
  width = 0;
  height = 0;
  radius = 0;
  length = 0;

  //draw cube on canvas
  public drawCube(context: any, canvas: any, x : any, y : any, wx : any, wy : any, h : any) {
    context.translate(canvas.width / 2, canvas.height / 2);
    // left face
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - wx, y - wx * 0.5);
    context.lineTo(x - wx, y - h - wx * 0.5);
    context.lineTo(x, y - h * 1);
    context.closePath();
    context.fillStyle = "#838357"
    context.strokeStyle = "#7a7a51";
    context.stroke();
    context.fill();

    // right face
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + wy, y - wy * 0.5);
    context.lineTo(x + wy, y - h - wy * 0.5);
    context.lineTo(x, y - h * 1);
    context.closePath();
    context.fillStyle = "#6f6f49";
    context.strokeStyle = "#676744";
    context.stroke();
    context.fill();

    // center face
    context.beginPath();
    context.moveTo(x, y - h);
    context.lineTo(x - wx, y - h - wx * 0.5);
    context.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
    context.lineTo(x + wy, y - h - wy * 0.5);
    context.closePath();
    context.fillStyle = "#989865";
    context.strokeStyle = "#8e8e5e";
    context.stroke();
    context.fill();
    context.translate(-(canvas.width / 2), -(canvas.height / 2));
  }  

  public drawCylinder ( context : any, canvas: any, x : any, y : any, w : any, h : any ) {
    context.beginPath();
    var xPos = canvas.width / 2;
    var yPos = canvas.length / 2;;
    //to draw the top circle
    for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.001) {

      xPos = (x + w / 2) - (w / 2 * Math.sin(i)) * 
        Math.sin(0 * Math.PI) + (w / 2 * Math.cos(i)) * 
        Math.cos(0 * Math.PI);

      yPos = (y + h / 8) + (h / 8 * Math.cos(i)) * 
        Math.sin(0 * Math.PI) + (h / 8 * 
        Math.sin(i)) * Math.cos(0 * Math.PI);

      if (i == 0) {
        context.moveTo(xPos, yPos);

      } 
      else
      {
        context.lineTo(xPos, yPos);
      }
    }
    context.stroke();
    context.fillStyle = "#f6f8f9"
    context.fill();

    //draw down -> curved line right -> draw up
    context.moveTo(x, y + h / 8);
    context.lineTo(x, y + h - h / 8);

    for (var i = 0 * Math.PI; i < Math.PI; i += 0.001) {
      xPos = (x + w / 2) - (w / 2 * Math.sin(i)) * Math.sin(0 * Math.PI) + (w / 2 * Math.cos(i)) * Math.cos(0 * Math.PI);
      yPos = (y + h - h / 8) + (h / 8 * Math.cos(i)) * Math.sin(0 * Math.PI) + (h / 8 * Math.sin(i)) * Math.cos(0 * Math.PI);

      if (i == 0) {
        context.moveTo(xPos, yPos);
      } 
      else 
      {
        context.lineTo(xPos, yPos);
      }
    }
    context.moveTo(x + w, y + h / 8);
    context.lineTo(x + w, y + h - h / 8);          
    context.stroke();
    
  }  
  public drawEquilateralTriangle(context : any, canvas: any, length : any){
    context.translate(canvas.width / 2, canvas.height / 2);
    //draw triangle;
    context.beginPath();
    context.moveTo(0, -length / 2);
    context.lineTo( -length / 2, length / 2);
    context.lineTo(length / 2, length / 2);
    context.lineTo(0, -length / 2);

    context.fillStyle = "#838357"
    context.strokeStyle = "#7a7a51";
    context.stroke();
    context.fill();
    context.translate(-(canvas.width / 2), -(canvas.height / 2));
  }

  //draws polygon based on sides ***ONLY FOR SIDES ABOVE 4***
  public drawPolygon(context : any, canvas: any, sides : number){
      var numberOfSides = sides,
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
  }

  // summary of the bindShape function is to bind the shape, width, height, radius, and length to the corresponding values from the server
  // @param event is the object that is returned from the server
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

  // summary of the bindCSSorCanvas function is to bind the css / canvas to the corresponding shape
  public bindCanvas(){
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    //clear canvas
    context.fillStyle = 'red';
    context.fill();
    context.clearRect(0, 0, canvas.width, canvas.height);    
    context.restore();
    //initialize x and y coordinates
    let x = (canvas.width / 2);
    let y = (canvas.height / 2);

    //switch case for shape and applies corresponding css or canvas code
    switch(this.shape){
      case "isosceles triangle":
        //draw isosceles triangle based off the width and height
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + (this.width/2), y);
        context.lineTo(x , y - this.height);
        context.lineTo(x - (this.width/2), y);
        context.lineTo(x, y);
        context.fillStyle = "#838357"
        context.strokeStyle = "#7a7a51";
        context.stroke();
        context.fill();
        return;
      case "square":
        context.beginPath();
        context.rect((canvas.width / 2) - (this.length/2), (canvas.height / 2) - (this.length/2), this.length, this.length);
        context.fillStyle = "#838357"
        context.strokeStyle = "#7a7a51";
        context.stroke();
        context.fill();       
        return;
      case "scalene triangle":
        //draw a scalene triangle based off the width and height using x and y coordinates
        //create a variable that randomizes from 10 to this.width*2
        var random = Math.floor(Math.random() * (this.width * 2 - 10 + 1) + 10);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + (this.width/2) + random, y);
        context.lineTo(x , y - this.height);
        context.lineTo(x - (this.width/2), y);
        context.lineTo(x, y);
        context.fillStyle = "#838357"
        context.strokeStyle = "#7a7a51";
        context.stroke();
        context.fill();        
        return;
      case "parallelogram":
        //draw a parallelogram based of the width and height using x and y coordinates
        x = x - (this.width / 2);
        y = y - (this.height / 2);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + this.width, y);
        context.lineTo(x + this.width - this.width * 0.45, y + this.height);
        context.lineTo(x - this.width * 0.45, y + this.height);
        context.lineTo(x, y);
        context.fillStyle = "#838357"
        context.strokeStyle = "#7a7a51";
        context.stroke();
        context.fill();
        return;
      case "equilateral triangle":
        this.drawEquilateralTriangle(context, canvas, this.length);     
        return;
      case "pentagon":
        this.drawPolygon(context, canvas, 5);       
        return;
      case "rectangle":
        context.beginPath();
        //draw a rectangle using the width and height
        context.rect((canvas.width / 2) - (this.width/2), (canvas.height / 2) - (this.height/2), this.width, this.height);
        context.fillStyle = "#838357"
        context.strokeStyle = "#7a7a51";
        context.stroke();
        context.fill(); 
        return;
      case "hexagon":
        this.drawPolygon(context, canvas, 6);         
        return;
      case "heptagon":
        this.drawPolygon(context, canvas, 7);       
        return;
      case "octagon":
        this.drawPolygon(context, canvas, 8);    
        return;
      case "circle":
        // draw a circle based off the radius
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, this.radius, 0, 2 * Math.PI);
        context.fillStyle = "#838357"
        context.strokeStyle = "#7a7a51";
        context.stroke();
        context.fill();
        return;
      case "oval":
        //draw oval based off the width and height
        context.beginPath();
        context.ellipse(canvas.width / 2, canvas.height / 2, this.width, this.height, 0, 0, 2 * Math.PI);
        context.fillStyle = "#838357"
        context.strokeStyle = "#7a7a51";
        context.stroke();
        context.fill();
        return;
      case "cube":
        this.drawCube(context, canvas, 50, 50, this.length, this.length, this.length);
        return;
      case "cylinder":
        this.drawCylinder(context, canvas, 50, 50, this.width, this.height);
        return;
      case "pyramid":
        //draw 3d pyramid with x and y coordinates
        let pyramid_width = this.width;
        let pyramid_height = this.height;

        // x = x + (pyramid_width / 2);
        y = y + (pyramid_height);

        //left face
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + pyramid_width, y - pyramid_width);
        context.lineTo(x, y - (pyramid_height + (pyramid_height*0.8)));
        context.lineTo(x, y);
        context.fillStyle = "#838357"
        context.strokeStyle = "#7a7a51";
        context.stroke();
        context.fill();

        //right face
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - pyramid_width, y - pyramid_width);
        context.lineTo(x, y - (pyramid_height + (pyramid_height*0.8)));
        context.lineTo(x, y);
        context.fillStyle = "#6f6f49";
        context.strokeStyle = "#676744";
        context.stroke();
        context.fill();
      return;
      case "rectangular prism":
        this.drawCube(context, canvas, 50, 50, this.width, this.length, this.height);
        return;
      default:
        return {
          
        }
    }
  }

  public submit(){
    //reset values
    this.shape = "";
    this.width = 0;
    this.height = 0;
    this.radius = 0;
    this.length = 0;


    // summary of the fetch function is to send the string to the server and receive the shape object back with the key values
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
        this.bindCanvas();
      })
      .catch(rejected => {
          alert(rejected);
      });        
    }
    input="";
}
