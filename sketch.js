// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;
let slider;
let predictor;
let add;
let train;
function preload() {
  classifier = ml5.featureExtractor('MobileNet');

  
}
function whileTrain(loss)
{ 
   if(loss==null)
   {
      console.log("Ready!!")
      predictor.predict(gotResult);
   }
   else
   {
     console.log(loss);
    }
   

}
function setup() {
  createCanvas(400, 400);
  img=createCapture(VIDEO);
  //img = createImg('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Turdus-migratorius-002.jpg/330px-Turdus-migratorius-002.jpg');
  //img=createImg('https://upload.wikimedia.org/wikipedia/commons/7/7b/Donkey_1_arp_750px.jpg',0,0,width,height);  
  predictor=classifier.regression(img);

  slider=createSlider(0,1,0.5,0.01);
  add=createButton("Add image");
  add.mousePressed(function(){predictor.addImage(slider.value());});
   
   train=createButton('Train');
   train.mousePressed(function(){predictor.train(whileTrain);});
   
    
  
  
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results.value);
    //document.getElementById('label').innerHTML='Label: ' + results[0].label;
    //document.getElementById('score').innerHTML='Confidence: ' + nf(results[0].confidence, 0, 2);
    if(results.value>=0.5)
       document.getElementById('label').innerHTML="Right";
     else
       document.getElementById('label').innerHTML="left";
    predictor.predict(img, gotResult);
  }
}