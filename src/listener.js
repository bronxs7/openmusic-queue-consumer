class Listener {
  constructor(playlistsService, mailSender) {
    this.PLAYLISTSSERVICE = playlistsService;
    this.MAILSENDER = mailSender;
 
    this.listen = this.listen.bind(this);
  }
 
  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
    
      const playlist = await this.PLAYLISTSSERVICE.getPlaylistSongs(playlistId);
      const result = await this.MAILSENDER.sendEmail(targetEmail, JSON.stringify(playlist, null, 2));

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
 
module.exports = Listener;