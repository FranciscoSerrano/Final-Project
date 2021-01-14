# Face and Mask Detection Models

> This sub project folder holds our data, data wrangling, and machine learning models.

## Project



### 📊 Wrangling the Data

Image files of faces and no faces.

### 😀 Face Detection Model



OpenCV provides the CascadeClassifier class that can be used to create a cascade classifier for face detection. The constructor can take a filename as an argument that specifies the XML file for a pre-trained model.

OpenCV provides a number of pre-trained models as part of the installation. These are available on your system and are also available on the OpenCV GitHub project.

Download a pre-trained model for frontal face detection from the OpenCV GitHub project and place it in your current working directory with the filename ‘haarcascade_frontalface_default.xml‘.

### 😷 Mask Detection Model

Use a cascade classifer to detect a face in a webcam window, extract the face and pass it to a convolutional neural network to classify the image as "no mask" or "mask".

![Project Overvierw](resources/ML_Project_Overview.png)

## 🖥 Environment

Included in our repository is our "requirements.txt" With this file in the repository, you can create the new environment by running:

```
python -m venv myenv
pip -r requirements.txt
```

### Methods Used
* Inferential Statistics
* Machine Learning
* Data Visualization
* Predictive Modeling
* etc.

### Technologies Used
* Python 3
* OpenCV
* Tensorflow/Keras
* Pandas
* numpy
* matplotlib

## 📑 Todo Checklist
**For a more detailed view of project tasks visit the Projects tab**

A helpful checklist for the things that need to be accomlished:

- [x] Project Overview
- [x] The Week of December 9th deliverables
    - [x] Set up a group repository
    - [x] Create a project timeline
    - [x] Establish a comminucation protocol
    - [x] Decide which technoligies will be used
- [ ] Add ML-Model and venv
- [ ] Begin work on front end
- [ ] Create a branch for each team members features

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

1. Fork this repository;
2. Create your branch: `git checkout -b my-new-feature`;
3. Commit your changes: `git commit -m 'Add some feature'`;
4. Push to the branch: `git push origin my-new-feature`.

**After your pull request is merged**, you can safely delete your branch.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
