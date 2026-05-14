# map-view

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A web component for displaying an interactive map with a marker. It uses Leaflet and map tiles from the Geospatial Information Authority of Japan (GSI).

## Demo

View the live demo: **https://github.com/code4fukui/map-view

## Features

- Displays an interactive map using Leaflet.js.
- Uses high-quality standard map tiles from the Geospatial Information Authority of Japan (GSI).
- Place markers using latitude/longitude or [Geo3x3](https://github.com/taisukef/Geo3x3/) codes.
- Customize marker appearance with pre-set colors or a custom icon URL.
- Popup links automatically generate Google Maps directions or can be set to a custom URL.
- Enable grayscale mode for a stylized map view.
- Set map dimensions and initial zoom level via attributes.
- Dynamically updates the map when attributes are changed.
- Scroll wheel zoom is disabled by default for a better page scrolling experience.

## Usage

1.  Import the module script into your HTML file.
2.  Use the `<map-view>` tag and set attributes to configure your map.

```html
<script type="module" src="https://code4fukui.github.io/map-view/map-view.js"></script>

<!-- Basic map with lat/lng and a colored marker -->
<map-view
  name="Hana道場"
  latlng="35.944571,136.186228"
  zoom="10"
  color="red"
></map-view>

<!-- Map using a Geo3x3 code and grayscale mode -->
<map-view
  name="Fukui Station"
  geo3x3="E9-3-5-5-5-1"
  zoom="15"
  grayscale="true"
></map-view>
```

## Attributes

Customize the map by setting the following attributes on the `<map-view>` element.

| Attribute | Description | Default | Example |
| :--- | :--- | :--- | :--- |
| `name` | The text displayed in the marker's popup.