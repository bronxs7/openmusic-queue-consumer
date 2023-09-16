class Listener {
  constructor(playlistsService, mailSender) {
    this.PLAYLISTSSERVICE = playlistsService;
    this.MAILSENDER = mailSender;
 
    this.listen = this.listen.bind(this);
  }
 
  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
    
      const playlist = await this.PLAYLISTSSERVICE.getPlaylistById(playlistId);
      const songs = await this.PLAYLISTSSERVICE.getSongsInPlaylist(playlistId);
      const content = {
        status: 'success',
        data: {
          playlist: {
            id: playlist.id,
            name: playlist.name,
            songs,
          },
        },
      }; 
      const result = await this.MAILSENDER.sendEmail(targetEmail, JSON.stringify(content));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
 
module.exports = Listener;