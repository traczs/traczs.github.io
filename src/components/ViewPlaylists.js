import React from 'react';

const ViewPlaylists = props => {    
    return(
        <div style = {{display: "flex"}}>
            <div style = {{flex: "70%"}}>
                <table style = {{marginLeft: "auto", marginRight: "auto"}}>
                    <thead>
                        <tr>
                            <th>Playlist name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.playlists.map(
                            playlist => 
                            <tr>
                                <td>{playlist.name}</td>
                                
                                <td style = {{paddingLeft: "15px"}}> 
                                    <button onClick={() => props.getPlaylistTracks(props.token, playlist.tracks.href)}>See songs</button> 
                                </td>
                                
                                <td style = {{paddingLeft: "15px"}}> 
                                    <button
                                        style = {{color: "red"}}
                                        onClick={() => props.getPlaylistForYT(props.token, playlist.tracks.href, playlist.name)}
                                    >
                                        Convert to Youtube Playlist
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div style = {{flex: "30%", height:"500px", overflow:"auto"}}>
                <table style = {{marginLeft: "auto", marginRight: "auto"}}>
                    <tbody>
                        {props.items.map(track => <tr>{track.track.name}</tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}

export default ViewPlaylists;