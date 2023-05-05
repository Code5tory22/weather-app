import axios from "axios";
import { useState } from "react";
import states from "../state";

function Form() {
    const [cityInput, SetCityInput] = useState("");
    const [APIData, setAPIData] = useState([]);
    const [stateInput, setStateInput] = useState()
    const appId = 'cb976094aae26290223f2f4101763ee2';
    
    const GeoCoordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},us&limit=10&appid=${appId}`;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSubmit = (e) => {
        e.preventDefault();
        if(cityInput === ""){
            alert("please enter city")
        }
        axios.get(GeoCoordUrl)
            .then((response) => {
                setAPIData(response)
            },
                (error) => {
                    console.log(error)
                }
            );
        SetCityInput("");
    };

    const handleSelection = (e) => {
        setStateInput(e.target.value)
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log(APIData);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => SetCityInput(e.target.value)}
                    placeholder="Enter a city"
                    value={cityInput}
                />
                <select
                    onChange={handleSelection}
                     name="states" 
                     id="states">
                     <option>Please choose one</option>
                    {states.map(state => <option key={state.id} value={state.value}>{state.name}</option>)}
                </select>
                <button>Search</button>
            </form>
            {/* {APIData.data?.map( city => <li key={city.state}>{city.state}</li> )} */}

        </div>

    );
}

export default Form;