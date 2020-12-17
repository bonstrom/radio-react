import React, { Component, useState, useEffect } from 'react';
import RadioStationsList from './RadioStationsList';
import RadioStationsCards from './RadioStationsCards';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';



const Home = function (props) {
	const [isListMode, setListMode] = useState(false);

	const [radioStations, setRadioStations] = useState([]);
	const [currentStation, setCurrentStation] = useState({});
	const [favouriteStations, setfavouriteStations] = useState([]);
	const [searchName, setSearchName] = useState("");

	useEffect(() => {
		console.log("loading true")
		async function fetchRadioStations() {
			await fetch('radio')
				.then(response => response.json())
				.then(data => setRadioStations(data))
				.catch(function () {
					console.log("error");
				});
		}


		async function fetchFavourites() {
			await fetch('favourites')
				.then(response => response.json())
				.then(data => setfavouriteStations(data))
				.catch(function () {
					console.log("error");
				});
		}

		async function fetchCurrentStation() {
			await fetch('radio/current')
				.then(response => response.json())
				.then(data => setCurrentStation(data))
				.catch(function () {
					console.log("error");
				});
		}

		fetchFavourites();
		fetchCurrentStation();
		fetchRadioStations();
		setInterval(() => { fetchCurrentStation(); }, 10000);

	}, []);

	const play = function (station) {
		fetch('radio/play/' + station.countryCode + "/" + station.id);
		setCurrentStation(station);
	}

	const stop = function () {
		fetch('radio/stop');
		setCurrentStation({});
	}

	const removeFromFavourite = function (radioId) {
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ radioId: radioId })
		};

		fetch('favourites', requestOptions)
			.then(response => response.json())
			.then(data => setfavouriteStations(data))
			.catch(function () {
				console.log("error");
			});;
	}

	const addToFavourite = function (radioId) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ radioId: radioId })
		};

		fetch('favourites', requestOptions)
			.then(response => response.json())
			.then(data => setfavouriteStations(data))
			.catch(function () {
				console.log("error");
			});;
	}

	const handleSearchChange = (e) => setSearchName(e.target.value);

	let listeningTo = currentStation.id
		? <label style={{ fontFamily: "Brush Script Std, cursive", fontSize: "50%" }}> 🎶 now listening to: {currentStation.name}</label>
		: <label ></label>;

	let buttons = <span>
		<Tooltip title="Card Mode">
			<IconButton color="primary" aria-label="card mode" component="span" onClick={() => setListMode(false)}>
				<AppsIcon />
			</IconButton>
		</Tooltip>
		<Tooltip title="List Mode">
			<IconButton color="primary" aria-label="list mode" component="span" onClick={() => setListMode(true)}>
				<ListIcon />
			</IconButton>
		</Tooltip>
	</span>;

	const radio = radioStations;

	if (searchName) {
		radio = radio.filter(r =>
			r.name.toLowerCase()
				.includes(searchName.toLowerCase())
		)
	}

	return (
		<div>
			<div>
				<h1 id="tabelLabel" style={{ marginRight: "40px" }}> Radio Stations {listeningTo} </h1>
				<div style={{ marginBottom: "3em" }}>
					<TextField id="standard-basic" label="filter name" style={{marginRight: 20}} onChange={handleSearchChange} />
					{buttons}
				</div>
			</div>
			{isListMode ?
				<RadioStationsList
					play={play}
					stop={stop}
					removeFromFavourite={removeFromFavourite}
					addToFavourite={addToFavourite}
					radioStations={radio}
					favouriteStations={favouriteStations}
					currentStation={currentStation}>
				</RadioStationsList> :
				<RadioStationsCards
					play={play}
					stop={stop}
					removeFromFavourite={removeFromFavourite}
					addToFavourite={addToFavourite}
					radioStations={radio}
					favouriteStations={favouriteStations}
					currentStation={currentStation}>
				</RadioStationsCards>}
		</div>
	);
}

export default Home;