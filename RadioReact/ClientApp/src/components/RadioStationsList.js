import React, { Component, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StarIcon from '@material-ui/icons/Star';
import GetFlags from './GetFlags';
import Emoji from './Emoji';


const lookup = require('country-code-lookup')

const RadioStationsList = function (props) {
    const { radioStations, favouriteStations, currentStation, stop, play, addToFavourite, removeFromFavourite } = props;

    const getFlag = function (countryCode) {
        return <Emoji
            symbol={GetFlags(countryCode)}
            label={lookup.byIso(countryCode).country}
        />
    }



    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Language</th>
                    <th>Genre</th>
                    <th>Favorite</th>
                </tr>
            </thead>
            <tbody>
                {
                    radioStations.filter(station => favouriteStations.includes(station.id)).map(station =>
                        <tr key={station.id} style={station.id === currentStation.id ? { backgroundColor: '#ccccff' } : {}}>
                            <td>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="play" component="span" onClick=
                                        {
                                            station.id === currentStation.id ? () => stop() : () => play(station)
                                        }>
                                        {station.id === currentStation.id ? <PauseIcon /> : <PlayArrow />}
                                    </IconButton>
                                </label>
                            </td>
                            <td>{station.name}</td>
                            <td>{getFlag(station.countryCode)}</td>
                            <td>{station.languages ? station.languages.join(", ") : ""}</td>
                            <td>{station.genres ? station.genres.join(", ") : ""}</td>
                            <td>
                                <label htmlFor="icon-button-file">
                                    <IconButton aria-label="favourite" component="span" onClick={() => favouriteStations.includes(station.id) ? removeFromFavourite(station.id) : addToFavourite(station.id)}>
                                        <StarIcon style={favouriteStations.includes(station.id) ? { color: "orange" } : { color: "grey" }} />
                                    </IconButton>
                                </label>
                            </td>
                        </tr>
                    )
                }
                {
                    radioStations.filter(station => !favouriteStations.includes(station.id)).map(station =>
                        <tr key={station.id} style={station.id === currentStation.id ? { backgroundColor: '#ccccff' } : {}}>
                            <td>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="play" component="span" onClick=
                                        {
                                            station.id === currentStation.id ? () => stop() : () => play(station)
                                        }>
                                        {station.id === currentStation.id ? <PauseIcon /> : <PlayArrow />}
                                    </IconButton>
                                </label>
                            </td>
                            <td>{station.name}</td>
                            <td>{getFlag(station.countryCode)}</td>
                            <td>{station.languages ? station.languages.join(", ") : ""}</td>
                            <td>{station.genres ? station.genres.join(", ") : ""}</td>
                            <td>
                                <label htmlFor="icon-button-file">
                                    <IconButton aria-label="favourite" component="span" onClick={() => favouriteStations.includes(station.id) ? removeFromFavourite(station.id) : addToFavourite(station.id)}>
                                        <StarIcon style={favouriteStations.includes(station.id) ? { color: "orange" } : { color: "grey" }} />
                                    </IconButton>
                                </label>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default RadioStationsList;