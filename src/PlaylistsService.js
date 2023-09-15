const { Pool } = require('pg');
const { mapDBToSongsModel, mapDBToPlaylistModel } = require('./utilities');

class PlaylistsService {
  constructor() {
    this.POOL = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT playlists.*, users.username FROM playlists LEFT JOIN users ON playlists.owner = users.id WHERE playlists.id = $1',
      values: [id],
    };

    const result = await this.POOL.query(query);
    return result.rows.map(mapDBToPlaylistModel)[0];
  }
 
  async getSongsInPlaylist(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs_in_playlist
      RIGHT JOIN songs ON songs_in_playlist.song_id = songs.id
      WHERE songs_in_playlist.playlist_id = $1
      GROUP BY songs.id`,
      values: [playlistId],
    };

    const result = await this.POOL.query(query);

    return result.rows.map(mapDBToSongsModel);
  }
}
 
module.exports = PlaylistsService;