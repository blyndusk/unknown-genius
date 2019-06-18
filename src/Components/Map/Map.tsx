
import React from 'react';
import Nav from './../Nav/Nav';
import Brand from './../Brand/Brand';
import MapFilters from './MapFilters/MapFilters';
import MapLegend from './MapLegend/MapLegend';
import MapPop from './MapPop/MapPop';
import MapSVG from './MapSVG/MapSVG';
import axios from 'axios';
import Compare from './../Compare/Compare';

interface P {}

interface S {
    country: string;
    // the filled data
    data: [{
        idprice: [{
            idcategory: {
                category: string;
            };
        }];
        idcountry: {
            name: string;
        };
        idaffiliation: {
            address: string;
        };
        gender: string;
    }];
    pricesPerCountries: {};
    // API
    baseUrl: string;
    // 2 types of API filters
    type: string[];
    // 3 params
    params: any,
    // Codes
    countryCode: string,
    fieldCode: string,
    lengthCode: number,
    lengthCountryCode: number,
    // call
    apiCall: string,
    calls: number,
}

export default class Map extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            country: '',
            // the filled data
            data: [{
                idprice: [{
                    idcategory: {
                        category: '',
                    },
                }],
                idcountry: {
                    name: '',
                },
                idaffiliation: {
                    address: '',
                },
                gender: '',
            }],
            pricesPerCountries: {},
            // API
            baseUrl: 'http://localhost:8000/api/',
            // 2 types of API filters
            type: [
                'people',
                'prices', 
                'categories'
            ],
            // 3 params
            params: {
                field: 'idprice.idcategory.category',
                country: 'idcountry.code',
                peopleCountry: 'idpeople.idcountry.code'
            },
            // Codes
            countryCode: '',
            fieldCode: '',
            lengthCode: 0,
            lengthCountryCode: 0,
            // call
            apiCall: '',
            calls: 0,
        }
    }
    UNSAFE_componentWillMount = () => {
        this.setState({
            fieldCode: ''
        })
    }
    // when the Map is mounted, handle country click & set new data
    componentDidMount = () => {
        this.handleCountryClick()
        this.setNewData()
    }
    // set new field code ( PHYSICS, PEACE, ..)
    handleFilterFieldClick = (e: any) => this.setState({fieldCode: e.target.dataset.label}, () => this.setNewData());
    // new api call with field param
    setNewData = () => {
        this.setCountriesColorization();
        this.setCountryData();
    }
    // api only called to update countries colorization
    setCountriesColorization = () => {
        // no param by default
        let params: any = {}
        // if a field param is detected, add field param
        if (this.state.fieldCode.length) params[this.state.params.field] = this.state.fieldCode;
        // api call, with custom param (field or no field)
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, update #dev status
        .then(res => this.setState({
            apiCall: res.request.responseURL,
            lengthCode: res.data["hydra:member"].length,
            calls: this.state.calls + 1    
        }, () => {
            // and parse countries with the result
            this.parseCountries(res.data["hydra:member"])
        }))
        .catch(err => console.log(err))
    }
    // api only called to update country's data
    setCountryData = () => {
        // create a conf object for the long expressions
        const conf = {
            field: {
                exist: this.state.fieldCode.length, 
                setParam(that: any) { params[that.state.params.field] = that.state.fieldCode }
            },
            country: {
                exist: this.state.countryCode.length,
                setParam(that: any) { params[that.state.params.country] = that.state.countryCode }
            }
        }
        // no param by default
        let params: any = {}
        // if there is neither field nor country, don't change anything
        if (!conf.field.exist && !conf.country.exist) params = {};
        // if there is a field but no country, add field param
        else if (conf.field.exist && !conf.country.exist) conf.field.setParam(this);
        // if there is a country but no field, add country param
        else if (!conf.field.exist && conf.country.exist) conf.country.setParam(this);
        // if there are both field and country
        else if (conf.field.exist && conf.country.exist) {
            // add both params, field & country
            conf.country.setParam(this)
            conf.field.setParam(this)
        }
        // api call, with no param, or field, or country, or both
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        // then, update the given data, and #dev status
        .then(res => this.setState({
            data: res.data["hydra:member"],
            apiCall: res.request.responseURL,
            lengthCode: res.data["hydra:member"].length,
            calls: this.state.calls + 1    
        }))
        .catch(err => console.log(err))
    }
    // set an object with amount of prices per country
    parseCountries = (data: [{idcountry: {code: string}}]) => {
        let codes: any = {}
        // map over all data
        data.map((code: {idcountry: {code: string}}) => {
            // get the country code
            const _code: string = code.idcountry.code;
            // if the country code exist in codes, increment it by 1
            if (_code in codes) codes[_code] = codes[_code] + 1
            // else, set to 1
            else codes[_code] = 1
            return code;
        })
        // update the price per contries object with new object
        this.setState({ pricesPerCountries: codes}, () => this.setCountryColors())
    }
    // colorize countries
    setCountryColors = () => {
        // codes is a large array of object with each amount of prices per country
        const codes: any = this.state.pricesPerCountries;
        // map over all DOM countries
        Array.from(document.querySelectorAll('.Map g')).map(g => {
            
            // for every country
            for (const key in codes) { 
                // if the country code match with the codes code, select all its children paths
                if (g.id.toUpperCase() === key ) Array.from(g.querySelectorAll('path')).map((path: any) => {
                    path.parentNode.classList.add('available');
                    // and fill them with a hsl color depending on the amount of prices in %
                    const percent = codes[key] + 33;
                    return path.style.fill = `hsl(213, ${percent}%, ${percent}%)`;
                })
            }
            return codes;
        });
    }
    // update call with country code
    handleCountryClick = () => {
        // for every DOM country, add a click event, 
        Array.from(document.querySelectorAll('.Map g')).map(g => g.addEventListener('click', () => {
            // update country code on click and make a new api call
            this.setState({countryCode: g.id}, () => this.apiCountriesCall())
        }));
    }
    // new call with country param (FR, US, GB, ...)
    apiCountriesCall = () => {
        // no params by default
        let params: any = {}
        // set country param (because we click on a country)
        params[this.state.params.country] = this.state.countryCode;
        // if there is a field filter, update param with field param
        if (this.state.fieldCode.length) params[this.state.params.field] = this.state.fieldCode
        // axios call with custom params
        axios.get(this.state.baseUrl + this.state.type[0], { params })
        .then(res => this.setState({
            data: res.data["hydra:member"],
            apiCall: res.request.responseURL,
            lengthCountryCode: res.data["hydra:member"].length,
            calls: this.state.calls + 1    
        }))
        .catch(err => console.log(err))
    }
    render() {
        return <section className="Map">
            <ul className="infos" style={window.location.hash === "#dev" ? {display: "block"} : {display: "none"}}>
                <li>Field : <span>{this.state.fieldCode}</span></li>
                <li>Country : <span>{this.state.countryCode}</span></li>
                <li>API call : <a href={this.state.apiCall}>{this.state.apiCall}</a></li>
                <li>calls : <span>{this.state.calls}</span></li>
                <li>{this.state.lengthCountryCode} people in <span>{this.state.fieldCode}</span> in <span>{this.state.countryCode}</span></li>
                <li>{this.state.lengthCode} people in <span>{this.state.fieldCode}</span></li>
            </ul>
            <Brand/>
            <Nav/>
            <MapLegend/>
            <MapPop
                country={this.state.countryCode}
                data={this.state.data}
                fieldCode={this.state.fieldCode}
            />
            <MapSVG/>
            <MapFilters
                setFieldFilter={this.handleFilterFieldClick}
            />

            <Compare/>
            <p className="Map__tutorial">Select colored countries to visualize data</p>
        </section>
    }
}
