import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetFlags from './GetFlags';
import Emoji from './Emoji';
import StarIcon from '@material-ui/icons/Star';


const lookup = require('country-code-lookup')


const RadioStationsCards = function (props) {
    const { radioStations, favouriteStations, currentStation, stop, play, addToFavourite, removeFromFavourite } = props;

    const getFlag = function (countryCode) {
        return <Emoji
            symbol={GetFlags(countryCode)}
            label={lookup.byIso(countryCode).country}
        />
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {
                radioStations.filter(station => favouriteStations.includes(station.id)).map(station => {
                    const stationStyle = station.id === currentStation.id
                        ? { minWidth: 250, maxHeight: 150, marginRight: "2em", marginBottom: "2em", cursor: "pointer", backgroundColor: "#ccccff" }
                        : { minWidth: 250, maxHeight: 150, marginRight: "2em", marginBottom: "2em", cursor: "pointer" };
                    return (


                        <Card
                            style={stationStyle}
                            onClick=
                            {
                                station.id === currentStation.id ? () => stop() : () => play(station)
                            }>
                            <div>
                                <CardContent>
                                    <Typography component="h5" variant="h5">
                                        {station.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {station.genres ? station.genres.join(", ") : ""}
                                    </Typography>
                                </CardContent>
                                <div>
                                    <IconButton aria-label="favourites" component="span" style={{}} onClick={(e) => {e.stopPropagation(); favouriteStations.includes(station.id) ? removeFromFavourite(station.id)  : addToFavourite(station.id);}}>
                                        <StarIcon style={favouriteStations.includes(station.id) ? { color: "orange" } : { color: "grey" }} />
                                    </IconButton>
                                    <span style={{ float: "right", fontSize: 24, paddingRight: 15, paddingTop: 7 }}>
                                        {getFlag(station.countryCode)}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    )
                }
                )
            }
            {
                radioStations.filter(station => !favouriteStations.includes(station.id)).map(station => {
                    const stationStyle = station.id === currentStation.id
                        ? { minWidth: 250, maxHeight: 150, marginRight: "2em", marginBottom: "2em", cursor: "pointer", backgroundColor: "#ccccff"  }
                        : { minWidth: 250, maxHeight: 150, marginRight: "2em", marginBottom: "2em", cursor: "pointer" };
                    return (
                        <Card
                            style={stationStyle}
                            onClick=
                            {
                                station.id === currentStation.id ? () => stop() : () => play(station)
                            }>
                            <div>
                                <CardContent>
                                    <Typography component="h5" variant="h5">
                                        {station.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {station.genres ? station.genres.join(", ") : ""}
                                    </Typography>
                                </CardContent>
                                <div>
                                    <IconButton aria-label="favourites" component="span" onClick={(e) => {e.stopPropagation(); favouriteStations.includes(station.id) ? removeFromFavourite(station.id) : addToFavourite(station.id)}}>
                                        <StarIcon style={favouriteStations.includes(station.id) ? { color: "orange" } : { color: "grey" }} />
                                    </IconButton>
                                    <span style={{ float: "right", fontSize: 24, paddingRight: 15, paddingTop: 7 }}>
                                        {getFlag(station.countryCode)}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    )
                }
                )
            }
        </div>
    );
}

export default RadioStationsCards;