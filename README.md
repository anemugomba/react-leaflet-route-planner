# React Leaflet Route Planner

This app (React, Leaflet, Laravel and Amazon Location Service) will calculate the optimal route between the origin and destination and return the travel time, distance, and route geometry. 
You can also configure various parameters such as the transportation mode, unit of measurement, departure time, avoidances, and vehicle profile when selecting a truck as the transportation mode. 
Some of the features are coming soon. This app was inspired by [AWS team, (click here for more information)](https://aws.amazon.com/blogs/mobile/efficient-truck-routing-with-amazon-location-service/), 
their web application is a Vue app that uses Amazon Location Service, as the base map provider and routing engine, MapLibre GL JS, as the map rendering library, and Tailwind CSS, as the UI component library.

This app is something I work on in my free time. I will be adding features as and optimization as time goes on. Feel free to reach out if you have any question.

## Installation

Download or clone the project. The description of how to setup the Laravel API is coming soon as it involves seting up aws and google accounts as well as deployment pipelines. Exciting times ahead. Run

```bash
npm install
npm start
```

## Usage

Type in and select different addresses along your route and click calculate. The planner will give you an optimal route.
[Click here to see the app in action](http://anesucain-route-planner.s3-website-us-east-1.amazonaws.com/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)