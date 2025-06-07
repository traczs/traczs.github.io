// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";

// const FoodPredict = () => {
//     const [model, setModel] = useState(null);
//     const [image, setImage] = useState(null);
//     const [prediction, setPrediction] = useState(null);
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         const loadModel = async () => {
//             try {
//                 const modelPath = "/tfjs_model/model.json";
//                 const loadedModel = await tf.loadLayersModel(modelPath);
//                 setModel(loadedModel);
//             } catch (error) {
//                 console.error("Error loading model:", error);
//             }
//         };
//         loadModel();
//     }, []);

//     const preprocessImage = (image) => {
//         const canvas = document.createElement("canvas");
//         canvas.width = 224;
//         canvas.height = 224;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(image, 0, 0, 224, 224);
//         const imageData = ctx.getImageData(0, 0, 224, 224);
//         const inputTensor = tf.browser.fromPixels(imageData).toFloat();
//         return inputTensor.expandDims();
//     };

//     const handleImageUpload = async (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();

//         reader.onload = async () => {
//             const img = new Image();
//             img.src = reader.result;
//             img.onload = () => {
//                 setImage(img);
//                 const processedImage = preprocessImage(img);
//                 makePrediction(processedImage);
//             };
//         };

//         reader.readAsDataURL(file);
//     };

//     const makePrediction = async (processedImage) => {
//         if (!model) return;

//         setProgress(0);

//         const tensor = tf.browser.fromPixels(processedImage).expandDims();
//         const predProb = model.predict(tensor);

//         setProgress(100);

//         const predClassIndex = predProb.argMax().dataSync()[0];
//         setPrediction({
//             class: class_names[predClassIndex],
//             probability: predProb.max().dataSync()[0],
//         });
//     };

//     return (
//         <div>
//             <h2>Project Doesn't Work Due to Lack of Backend</h2>
//             <form onSubmit={(e) => e.preventDefault()}>
//                 <input type="file" onChange={handleImageUpload} />
//                 <button type="submit">Upload Image</button>
//             </form>
//             {progress < 100 && <p>Prediction in progress... {progress}%</p>}
//             {image && (
//                 <div>
//                     <img src={image.src} alt="Uploaded" />
//                     {prediction && (
//                         <div>
//                             <h2>Prediction</h2>
//                             <p>Class: {prediction.class}</p>
//                             <p>
//                                 Probability: {prediction.probability.toFixed(2)}
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             )}
//             <Link to="/portfolio">Close Project</Link>
//         </div>
//     );
// };

// export default FoodPredict;
