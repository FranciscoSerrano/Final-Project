# Masky

> Facts on combatting community transmission

## Meet the Team

<img src="/resources/cisco.png" width="175" /> | <img src="resources/annie.png" width="175" /> | <img src="/resources/jovani.png" width="175" /> | <img src="resources/max.png" width="175" />
-- | -- | -- | --
Francisco | Annie | Jovani | Max

## General

This project will aim to create a model that can tell whether or not you have a face mask on. Inspired by the pandemic of 2020.
As shown above the project breakdown was simple. Use a cascade classifier to detect a face in a webcam window, extract the face and pass it to a convolutional neural network to classify the image as "no mask" or "mask".

The goal will be to add this model to the web and build a webapp that a user can use to check for a mask through their webcam. The model will also be able to predict a users age when they are not wearing a mask and use the latest data from the CDC to determine if they are at high risk for COVID-19.

Possible additional features may include the ability for the model to aid in giving the user an expected timeline for a vaccine to be available to them based on [this](https://www.nytimes.com/interactive/2020/12/03/opinion/covid-19-vaccine-timeline.html) vaccine tool from the New York Times.

## Project Structure

```
.
├── projects
│   ├── mask-api
│   ├── mask-dashboard
│   └── mask-model
├── resources
│   ├── annie.png
│   ├── cisco.png
│   ├── jovani.png
│   └── max.png
└── README.md
```

## Technologies Used

- Python 3
- Numpy, Tensorflow, Keras, OpenCV
- React, D3.js, Bootstrap
- Flask, SQLAlchemcy, PostgreSQL, MongoDB

## Todo Checklist

**For a more detailed view of project tasks visit the Projects tab**

A helpful checklist for the things that need to be accomplished:

- [ ] Project Overview
- [ ] Complete project README.md
