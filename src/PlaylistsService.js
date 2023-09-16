const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this.POOL = new Pool();
  }

  async getPlaylistSongs(id) {
    const playlistQuery = {
      text: 'SELECT id, name FROM playlists WHERE playlists.id = $1',
      values: [id],
    };

    const playlistSongQuery = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs_in_playlist
      RIGHT JOIN songs ON songs_in_playlist.song_id = songs.id
      WHERE songs_in_playlist.playlist_id = $1
      GROUP BY songs.id`,
      values: [id],
    };

    const playlistResult = await this.POOL.query(playlistQuery);
    const playlistSongResult = await this.POOL.query(playlistSongQuery);
   
    const result = {
      playlist: {
        ...playlistResult.rows[0],
        songs: playlistSongResult.rows,
      },
    };

    return result;
  }
}
 
module.exports = PlaylistsService;