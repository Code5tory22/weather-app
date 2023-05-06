import axios from "axios";
import { useEffect, useState, } from "react";
import states from "../state";

function Form() {
    const [cityInput, SetCityInput] = useState("");
    const [APIData, setAPIData] = useState([]);
    const [stateInput, setStateInput] = useState();
    const [isdisabled, setIsdisabled] = useState(false);
    const [borderToggler, setBorderToggler] = useState({});
    // const [lon, setLon] =
    const appId = 'cb976094aae26290223f2f4101763ee2';
    const GeoCoordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},us&limit=10&appid=${appId}`;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (cityInput.length < 1 || stateInput === undefined) {
            setIsdisabled(true);
            // setBorderToggler({border:'1px solid red'})
        } else {
            setIsdisabled(false);
            // setBorderToggler({border: '1px solid black'})
        }
    }, [cityInput, stateInput]);

    const handleSubmit = (e) => {
        e.preventDefault();
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
    // TEST//
    console.log(APIData);
    console.log(cityInput)
    console.log(stateInput);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => SetCityInput(e.target.value)}
                    placeholder="Enter a city"
                    value={cityInput}
                    style={borderToggler}
                />
                <select
                    onChange={handleSelection}
                    name="states"
                    id="states"
                    style={borderToggler}
                >
                    <option>Please choose one</option>
                    {states.map(state => <option key={state.id} value={state.value}>{state.name}</option>)}
                </select>
                <button disabled={isdisabled}>Search</button>
            </form>
            {/* {APIData.data?.map( city => <li key={city.state}>{city.state}</li> )} */}
        </div>
    );
}

export default Form;