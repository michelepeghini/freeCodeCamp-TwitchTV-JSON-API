# freeCodeCamp-TwitchTV-JSON-API

This is a TwitchTV viewer developed for the freeCodeCamp Front End Certificate. It displays a list of Twitch.TV channels, indicating whether they are streaming or not and provides all available live streams for those channels in a separate tab. 

## Getting started

This is a stand alone single page app, all external libraries needed are either included as files on the repo or via CDN

## Requirements

* Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/Myvqmo/)
* **User Story:** I can see whether Free Code Camp is currently streaming on Twitch.tv
* **User Story:** I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
* **User Story:** if a Twitch user is currently streaming, I can see additional details about what they are streaming.

## Features

* A module pattern has been used to make a reusable twitch object 

* **Channels tab:**  
  * Visualizes logo, name, number of subscribers for every channel the user is subscribed to
  * The dot on the side of channel name is either green or grey depending on whether the channel is currently streaming or not.
  * Clicking on a channel strip opens link to channel page on Twitch.TV in a new tab
  * Channel strip displays error message if a channel is not found

* **Streams tab:** 
  * lists all live streams from subscribed channels 
  * Visualizes stream thumb, stream name, number of active viewers for every stream
  * Clicking on a Stream strip opens link to live stream page on Twitch.TV in a new tab

### NOTE: 

* Due to CORS restrictions, Twitch API is used via a [proxy](https://wind-bow.glitch.me/twitch-api/)
* The list of channels (suppesedly subscriptoins) are  pre-defined statically in an array, as suggested by codeFreeCamp.

## Screenshots

![###](/###.png "###")

## APIs / Libraries used
* [Twitch.TV API](https://dev.twitch.tv/api)
* [Twitch.TV API proxy](https://wind-bow.glitch.me/twitch-api/) 
* jQuery 3.2.1
* Bootstrap 3.3.7 CSS

## Licence 

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Creative Commons License")

