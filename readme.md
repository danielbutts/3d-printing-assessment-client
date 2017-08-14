# PARTridge - 3D Printing Assessment Tool

PARTridge is a proof-of-concept assessment and decision support tool built for a startup creating a platform and marketplace for companies moving to on-demand 3D printing of industrial parts. The application allows a user to upload a parts list and quickly assess the potential for digitization; focusing engineering time and effort only on the parts most likely to benefit. The application is build as an Node/Express/AngularJS client that consumes a Java/Spring REST API [3d-printing-assessment-api](https://github.com/danielbutts/3d-printing-assessment-api).

![Splash Screen Image](https://github.com/danielbutts/3d-printing-assessment-client/blob/master/partridge-splash.png?raw=true)

![Dashboard Image](https://github.com/danielbutts/3d-printing-assessment-client/blob/master/partridge-dashboard.png?raw=true)

![alt text](https://github.com/danielbutts/3d-printing-assessment-client/blob/master/partridge-detail.png?raw=true)

## Key Features

- Ability to upload multiple parts as a .csv file
- Tabular view of uploaded parts sorted by calculated score between 1 and 100 (100 being most viable as a 3D printed part)
- Detail view of parts including graph of estimated unit price at various quantities
- Administrative tools for creating/modifying printing vendors

## Built With

* [NodeJS](https://nodejs.org)
* [Express](https://expressjs.com/)
* [AngularJS](https://angularjs.org/)
* [ChartJS](http://www.chartjs.org/)

## Author

* [**Daniel Butts**] (https://github.com/danielbutts)

## Other Resources

* [3D Printing Assessment API](https://github.com/danielbutts/3d-printing-assessment-api)
* [Presentation Slides](https://docs.google.com/presentation/d/1OZ3dQM0XrzSwwCkKYrvwR0XvF68GWWbcVHSVPATfsIw/edit?usp=sharing)
* [Presentation Video](https://vimeo.com/229517666)

## Acknowledgments

* Many thanks to [3Discovered](http://3discovered.com/) for proposing the project and providing early and continuous feedback on the MVP application.