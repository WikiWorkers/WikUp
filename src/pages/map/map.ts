import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import leaflet from 'leaflet';


@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapContainer: ElementRef;
    map: any;
    private attributions =
        'Map data &copy; ' +
        '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>';

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidEnter() {
        this.loadmap();
    }

    loadmap() {
        //TODO delete an load the map all the time? Is not a good idea I think
        if (this.map != undefined) {
            this.map.remove();
        }

        this.map = leaflet.map("map").fitWorld();

        leaflet
            .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attributions: this.attributions,
                maxZoom: 18
            })
            .addTo(this.map);

        this.map
            .locate({
                setView: true,
                maxZoom: 10
            })
            .on('locationfound', this.locationfound)
            .on('locationerror', this.locationerror)

    }

    private locationfound(e) {
        let markerGroup = leaflet.featureGroup();
        let marker: any = leaflet
            .marker([e.latitude, e.longitude])
            .on('click', () => {
                alert('Marker clicked');
            });
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
    }

    private locationerror(err) {
        alert(err.message);
    }
}
