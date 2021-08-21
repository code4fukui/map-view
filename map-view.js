import L from "https://code4sabae.github.io/leaflet-mjs/leaflet.mjs";
import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.mjs";
import { LeafletSprite } from "https://taisukef.github.io/leaflet.sprite-es/src/sprite.js";
LeafletSprite.init(L);

const getMapLink = (ll) => {
  const link = "https://www.google.com/maps/dir/?api=1&destination=" + ll[0] + "," + ll[1];
  return link;
};

class MapView extends HTMLElement {
  constructor () {
    super();

    const grayscale = this.getAttribute("grayscale");

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://code4sabae.github.io/leaflet-mjs/" + (grayscale ? "leaflet-grayscale.css" : "leaflet.css");
    this.appendChild(link);
    link.onload = () => this.init();
  }
  async init () {
    const div = document.createElement("div");
    this.appendChild(div);
    div.style.width = this.getAttribute("width") || "100%";
    div.style.height = this.getAttribute("height") || "60vh";
    const icon = this.getAttribute("icon");
    const iconsize = this.getAttribute("iconsize") || 30;
    const filter = this.getAttribute("filter")?.split(",");
    const color = this.getAttribute("color");
    
    const map = L.map(div);
    this.map = map;
    // set 国土地理院地図 https://maps.gsi.go.jp/development/ichiran.html
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
      attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"',
      maxZoom: 18,
    }).addTo(map);

    const iconlayer = L.layerGroup();
    iconlayer.addTo(map);

    const getLatLng = (d) => {
      const geo3x3 = this.getAttribute("geo3x3");
      if (geo3x3) {
        const pos = Geo3x3.decode(geo3x3);
        return [pos.lat, pos.lng];
      }
      const lat = this.getAttribute("lat");
      const lng = this.getAttribute("lng");
      if (lat && lng) {
        return [lat, lng];
      }
      const ll = this.getAttribute("latlng");
      if (ll) {
        return ll.split(",");
      }
      return null;
    };
    const ll = getLatLng();
    if (!ll) {
        return;
    }
    const zoom = this.getAttribute("zoom") || 13;
    map.setView(ll, zoom);

    const title = this.getAttribute("name");
    if (!title || title.length == 0) {
      return;
    }
    const url = this.getAttribute("url") || getMapLink(ll);
    const opt = { title };
    if (icon) {
      opt.icon = L.icon({
        iconUrl: icon,
        iconRetilaUrl: icon,
        iconSize: [iconsize, iconsize],
        iconAnchor: [iconsize / 2, iconsize / 2],
        popupAnchor: [0, -iconsize / 2],
      });
    } else if (color) {
      if (LeafletSprite.colors.indexOf(color) >= 0) {
        opt.icon = L.spriteIcon(color);
      }
    }
    const marker = L.marker(ll, opt);
    marker.addTo(map).bindPopup(title ? url ? `<a href=${url}>${title}</a>` : title : "").openPopup();
    map.scrollWheelZoom.disable();
  }
}

customElements.define("map-view", MapView);
