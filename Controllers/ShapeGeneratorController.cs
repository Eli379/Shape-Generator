using Microsoft.AspNetCore.Mvc;

namespace Lynkz.Controllers;

[ApiController]
[Route("[controller]")]
public class ShapeGeneratorController : ControllerBase
{
    private readonly ILogger<ShapeGeneratorController> _logger;

    public ShapeGeneratorController(ILogger<ShapeGeneratorController> logger)
    {
        _logger = logger;
    }

    // <summary> method that checks the string for a shape and sets the shape property of the ShapeData object to the shape found in the string </summary>
    // <param name="inputString">string to check for shape</param>
    // <param name="shapeData">ShapeData object to set shape property</param>
    public void GetShape(string inputString, ShapeData shapeData)
    {
        //switch case for content depending on what shape is contained
        switch (inputString.ToLower())
        {
            //if content contains isosceles triangle , set shape to isosceles triangle
            case string str when str.Contains("isosceles triangle"):
                shapeData.Shape = "isosceles triangle";
                break;
            //if content contains square , set shape to square
            case string str when str.Contains("square"):
                shapeData.Shape = "square";
                break;
            //if content contains scalene triangle , set shape to scalene triangle
            case string str when str.Contains("scalene triangle"):
                shapeData.Shape = "scalene triangle";
                break;
            //if content contains parallelogram , set shape to parallelogram
            case string str when str.Contains("parallelogram"):
                shapeData.Shape = "parallelogram";
                break;
            //if content contains equilateral triangle , set shape to equilateral triangle
            case string str when str.Contains("equilateral triangle"):
                shapeData.Shape = "equilateral triangle";
                break;
            //if content contains pentagon , set shape to pentagon
            case string str when str.Contains("pentagon"):
                shapeData.Shape = "pentagon";
                break;
            //if content contains rectangle , set shape to rectangle
            case string str when str.Contains("rectangle"):
                shapeData.Shape = "rectangle";
                break;
            //if content contains hexagon , set shape to hexagon
            case string str when str.Contains("hexagon"):
                shapeData.Shape = "hexagon";
                break;
            //if content contains heptagon , set shape to heptagon
            case string str when str.Contains("heptagon"):
                shapeData.Shape = "heptagon";
                break;
            //if content contains octagon , set shape to octagon
            case string str when str.Contains("octagon"):
                shapeData.Shape = "octagon";
                break;
            //if content contains circle , set shape to circle
            case string str when str.Contains("circle"):
                shapeData.Shape = "circle";
                break;
            //if content contains oval , set shape to oval
            case string str when str.Contains("oval"):
                shapeData.Shape = "oval";
                break;
                        //if content contains cube , set shape to cube
            case string str when str.Contains("cube"):
                shapeData.Shape = "cube";
                break;
            //if content contains cylinder , set shape to cylinder
            case string str when str.Contains("cylinder"):
                shapeData.Shape = "cylinder";
                break;
            //if content contains pyramid , set shape to pyramid
            case string str when str.Contains("pyramid"):
                shapeData.Shape = "pyramid";
                break;
            //if content contains rectangular prism , set shape to rectangular prism
            case string str when str.Contains("rectangular prism"):
                shapeData.Shape = "rectangular prism";
                break;
            default:
                break;
        }
    }

    // <summary> method that checks the string for a width and sets the shape property of the ShapeData object to the width found in the string </summary>
    // <param name="inputString">string to check for width</param>
    // <param name="shapeData">ShapeData object to set width property</param>
    public void GetWidth(string inputString, ShapeData shapeData)
    {
        //if inputString contains width, split string into array of strings, increment by 2 and get the int value
        if (inputString.Contains("width"))
        {        
            //split the string into an array of strings
            string[] splitString = inputString.Split(" ");
            //loop through the array of strings
            for (int i = 0; i < splitString.Length; i++)
            {
                //if the string contains width of, set width to the number after width
                if (splitString[i].Contains("width"))
                {
                    if(splitString[i+1].Contains("of")){
                        shapeData.Width = int.Parse(splitString[i+2]);
                    }
                }
            }
        }
    }

    // <summary> method that checks the string for a height and sets the shape property of the ShapeData object to the height found in the string </summary>
    // <param name="inputString">string to check for height</param>
    // <param name="shapeData">ShapeData object to set height property</param>
    public void GetHeight(string inputString, ShapeData shapeData)
    {
        //if inputString contains height, split string into array of strings, increment by 2 and get the int value
        if (inputString.Contains("height"))
        {        
            //split the string into an array of strings
            string[] splitString = inputString.Split(" ");
            //loop through the array of strings
            for (int i = 0; i < splitString.Length; i++)
            {
                //if the string contains height of, set height to the number after height
                if (splitString[i].Contains("height"))
                {
                    if(splitString[i+1].Contains("of")){
                        shapeData.Height = int.Parse(splitString[i+2]);
                    }
                }
            }
        }
    }

    // <summary> method that checks the string for a radius and sets the shape property of the ShapeData object to the radius found in the string </summary>
    // <param name="inputString">string to check for radius</param>
    // <param name="shapeData">ShapeData object to set radius property</param>
    public void GetRadius(string inputString, ShapeData shapeData)
    {
        //if inputString contains radius, split string into array of strings, increment by 2 and get the int value
        if (inputString.Contains("radius"))
        {        
            //split the string into an array of strings
            string[] splitString = inputString.Split(" ");
            //loop through the array of strings
            for (int i = 0; i < splitString.Length; i++)
            {
                //if the string contains radius of, set radius to the number after radius
                if (splitString[i].Contains("radius"))
                {
                    if(splitString[i+1].Contains("of")){
                        shapeData.Radius = int.Parse(splitString[i+2]);
                    }
                }
            }
        }
    }

    // <summary> method that checks the string for a length and sets the shape property of the ShapeData object to the length found in the string </summary>
    // <param name="inputString">string to check for length</param>
    // <param name="shapeData">ShapeData object to set length property</param>
    public void GetLength(string inputString, ShapeData shapeData)
    {
        //if inputString contains length, split string into array of strings, increment by 2 and get the int value
        if (inputString.Contains("length"))
        {        
            //split the string into an array of strings
            string[] splitString = inputString.Split(" ");
            //loop through the array of strings
            for (int i = 0; i < splitString.Length; i++)
            {
                //if the string contains length of, set length to the number after length
                if (splitString[i].Contains("length"))
                {
                    if(splitString[i+1].Contains("of")){
                        shapeData.Length = int.Parse(splitString[i+2]);
                    }
                }
            }
        }
    }

    // just to test api
    [HttpGet]
    [Route("test")]
    public ShapeData test()
    {
        return new ShapeData
        {
            Shape = "Square",
            Width = 0,
            Height = 5,
            Radius = 0,
            Length = 0
        };
    }
    // <summary> method that takes in a string and returns a ShapeData object </summary>
    // <param name="content">string to check for shape, width, height, radius, and length</param>
    [HttpPost]
    [Route("Input")]
    public ShapeData Input([FromBody] string content)
    {
        //initialize ShapeData object
        ShapeData shapeData = new(){
            Shape = null,
            Width = null,
            Height = null,
            Radius = null,
            Length = null
        };
        GetShape(content, shapeData);
        GetWidth(content, shapeData);
        GetHeight(content, shapeData);
        GetRadius(content, shapeData);
        GetLength(content, shapeData);

        return shapeData;
    }
}
