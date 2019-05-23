
import React, { Component } from 'react';
import MapSVG from './SVG/MapSVG'

class Map extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount = () => {
        console.log(document.querySelectorAll('.Map path'))
        const paths = document.querySelectorAll('.Map path');
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const color = Math.floor(Math.random() * (66 - 24) ) + 24
            path.style.fill = `hsl(213, ${color}%, ${color}%)`
            
            
        }
        const gs = document.querySelectorAll('.Map g');
        for (let j = 0; j < gs.length; j++) {
            const g = gs[j];
            g.addEventListener('click', () => console.log(g.id))
            
        }
    }
    render() {
        return <section className="Map">    
        <MapSVG/>
         </section>
    }
}

export default Map;
