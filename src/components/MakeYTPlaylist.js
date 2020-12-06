import React from 'react';
import * as $ from "jquery";

class MakeYTPlaylist extends React.Component {
    constructor() {
        super();
        this.state = {
            youtubeToken: null,
            items: [{
                track: {
                    name: "",
                    artists: "",
                },
            }],
            youtubeVideoIDs: [],
            playlistId: "",
            process: "None",
            no_data: false,
            errorMessage: "",
        }

        this.makeEmptyPlaylist = this.makeEmptyPlaylist.bind(this); 
        this.searchYT = this.searchYT.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
    }

    async componentDidMount(){
        await this.setState({
            items: JSON.parse(sessionStorage.getItem("Playlist"))
        });
        try{
            await this.makeEmptyPlaylist();
        } catch(e) {
            console.log(e);
        }
        if(this.state.no_data === false){
            try{
                await this.searchYT();
            } catch(e) {
                console.log(e);
            }
        }
        if(this.state.no_data === false){
            try{
                await this.addToPlaylist();
            } catch(e) {
                console.log(e);
            }
        }
    }

    async makeEmptyPlaylist(){
        await this.setState({
            process: "Creating Playlist"
        });
        
        //if the name is not retrieved, set default as 'my spotify playlist'
        var plName = "My Spotify Playlits";
        plName = sessionStorage.getItem("PlaylistName");

        //creates empty youtube playlist with given playlist name above
        await $.ajax({
            url: "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus",
            type: "POST",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.props.youtubeToken);
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            data: `{
                "snippet":
                {
                    "title":"`+ plName +`",
                    "description":"Playlist converted from Spotify",
                    "defaultLanguage":"en"
                },
                "status":{
                    "privacyStatus":"private"
                }
            }`,
            success: (data) => {
                console.log(data);
                this.setState({
                   playlistId: data.id,
                   process: "Created Playlist"
                });
            },
            error: (errorThrown) => {
                var e = JSON.parse(errorThrown.responseText);
                this.setState({
                    no_data: true,
                    errorMessage: e.error.message,
                    process: "Error"
                });
            }
        });

    }

    async searchYT(){
        await this.setState({
            process: "Searching For All Songs"
        });

        var videoIDArray = [];

        for(var item of this.state.items){  
            var searchString = "";
            searchString = item.track.name;
            
            item.track.artists.forEach(name => {
                searchString += " " + name.name;
            });
            
            searchString = searchString.replace(/ /g, '%20');

            await $.ajax({
                url: "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + searchString,
                type: "GET",
                beforeSend: (xhr) => {
                    xhr.setRequestHeader("Authorization", "Bearer " + this.props.youtubeToken);
                    xhr.setRequestHeader("Accept", "application/json");
                },
                success: (data) => {
                    videoIDArray.push(data.items[0].id.videoId);
                },
                error: (errorThrown) => {
                    var e = JSON.parse(errorThrown.responseText);
                    this.setState({
                        no_data: true,
                        errorMessage: e.error.message,
                        process: "Error"
                    });
                }
            });
        };

        await this.setState({
            youtubeVideoIDs: videoIDArray,
            process: "Found All Songs"
        });
    }

    async addToPlaylist(){
        await this.setState({
            process: "Adding Songs To Playlist, Please Wait"
        });

        for(var videoID of this.state.youtubeVideoIDs){
            await $.ajax({
                url: "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet",
                type: "POST",
                beforeSend: (xhr) => {
                    xhr.setRequestHeader("Authorization", "Bearer " + this.props.youtubeToken);
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Content-Type", "application/json");
                },
                data:`{"snippet":{"playlistId":"` + this.state.playlistId + `","position":0,"resourceId":{"kind":"youtube#video","videoId":"`+ videoID +`"}}}`,
                success: (data) => {
                    console.log(data);
                },
                error: (errorThrown) => {
                    var e = JSON.parse(errorThrown.responseText);
                    this.setState({
                        no_data: true,
                        errorMessage: e.error.message,
                        process: "Error"
                    });
                }
            });
        }

        await this.setState({
            process: "Converted Your Spotify Playlist To Youtube"
        });
    }

    render() {
        return(
            <div>
                <p>Current State: {this.state.process}</p>
                {this.state.no_data && (
                    <p>
                        {this.state.errorMessage}
                    </p>
                )}
            </div>
        );
    }
}

export default MakeYTPlaylist;