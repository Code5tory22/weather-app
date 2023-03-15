import axios from "axios";
import { useState } from "react";

function Form() {
    const [cityInput, SetCityInput] = useState("");
    const [data, setData] = useState([]);

    const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=10&appid=cb976094aae26290223f2f4101763ee2`

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(baseUrl)
            .then((response) => {
                setData(response)
            },
                (error) => {
                    console.log(error)
                }
            );
        SetCityInput("");
    }
    console.log(data)
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={(e) => SetCityInput(e.target.value)}
                value={cityInput}
            />
            <button>Search</button>
        </form>
    );
}

export default Form;