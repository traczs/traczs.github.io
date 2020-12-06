import React, { Component } from "react";
import * as $ from "jquery";
import Hero from '../components/Hero';
import {
    spotifyAuthEndpoint,
    spotifyClientId,
    spotifyRedirectUri,
    spotifyScopes,
    youtubeAuthEndPoint,
    youtubeClientId,
    youtubeRedirectUri,
    youtubeScopes,
} from "../config";
import hash from "../hash";
import MakeYTPlaylist from "../components/MakeYTPlaylist";
import ViewPlaylists from "../components/ViewPlaylists";

class ConvertPlaylist extends Component {
    constructor() {
        super();
        this.state = {
            token: null,
            youtubeToken: null,
            playlists: [{
                id: "",
                name: "",
            }],
            no_data: false,

            number_of_songs: 0,
            items: [{
                track: {
                    name: "",
                    artists: "",
                },
            }],
        };

        this.getAllPlaylists = this.getAllPlaylists.bind(this);
        this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
        this.getPlaylistForYT = this.getPlaylistForYT.bind(this);
        
    }

    componentDidMount() {
        // Set token
        let _token = hash.access_token;
        
        if(_token && (!hash.scope)) {
            // Set token
            this.setState({
                token: _token,
            });
            //this.getCurrentlyPlaying(_token);
            this.getAllPlaylists(_token);
        }
        else if(_token && (hash.scope.includes("youtube"))){
            this.setState({
                youtubeToken: _token,
            });
        }
    }

    getAllPlaylists(token) {
        $.ajax({
            url: "https://api.spotify.com/v1/me/playlists",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                // Checks if the data is not empty
                if (!data) {
                    this.setState({
                        no_data: true,
                    });
                    return;
                }

                this.setState({
                    playlists: data.items,
                    no_data: false,
                });
            },
        });
    }

    async getPlaylistTracks(token, href) {
        
        href += "?offset=";
        var tempItems = [];
        var offset = 0;

        //retrieve all songs 100 at a time
        do{
            var apiCall = href + offset; 
            await $.ajax({
                url: apiCall,
                type: "GET",
                beforeSend: (xhr) => {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: (data) => {
                    // Checks if the data is not empty
                    if (!data) {
                        this.setState({
                            no_data: true,
                        });
                        return;
                    }

                    Array.prototype.push.apply(tempItems,data.items);

                    this.setState({
                        number_of_songs: data.total,
                    });
                },
            });
            offset += 100;
        } while(this.state.number_of_songs > offset)

        this.setState({
            items: tempItems,
        }); 
    }

    async getPlaylistForYT(token, href, playlistName) {
        await this.getPlaylistTracks(token,href);
        sessionStorage.setItem('Playlist', JSON.stringify(this.state.items));
        sessionStorage.setItem('PlaylistName', playlistName);
        window.location.href = `${youtubeAuthEndPoint}?client_id=${youtubeClientId}&redirect_uri=${youtubeRedirectUri}&scope=${youtubeScopes.join("%20")}&response_type=token&show_dialog=true`;
    } 

    render() {
        return (
            <div>
                <Hero title={this.props.title} subTitle={this.props.subTitle} text={this.props.text}></Hero>
                <header>
                    {!this.state.token && !this.state.youtubeToken && (
                        <a
                            style = {{color: "#1ecd97", display: "flex", justifyContent: "center", alignItems: "center"}}
                            href={`${spotifyAuthEndpoint}?client_id=${spotifyClientId}&redirect_uri=${spotifyRedirectUri}&scope=${spotifyScopes.join(
                                "%20"
                            )}&response_type=token&show_dialog=true`}
                        >
                            Login to Spotify
                        </a>
                    )}
                    {this.state.token && !this.state.no_data && (
                        <ViewPlaylists
                            token = {this.state.token}
                            playlists = {this.state.playlists}
                            items = {this.state.items}
                            getPlaylistTracks = {this.getPlaylistTracks}
                            getPlaylistForYT = {this.getPlaylistForYT}
                        />
                    )}
                    {this.state.youtubeToken && !this.state.no_data && (
                        <MakeYTPlaylist 
                            youtubeToken = {this.state.youtubeToken}
                        />
                    )}

                    {this.state.no_data && (
                        <p>
                            You need to have a playlist on Spotify, for something to appear
                            here.
                        </p>
                    )}
                </header>
            </div>
        );
    }
}

export default ConvertPlaylist;
