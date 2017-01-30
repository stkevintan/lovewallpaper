import React from 'react';

import ScrollBars from 'react-custom-scrollbars';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';

import Divider from 'material-ui/Divider';

import { ipcRenderer } from 'electron';

export default muiThemeable()(class ImageGrids extends React.Component {
  static propTypes = {
    tiles: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      small: React.PropTypes.string.isRequired,
      big: React.PropTypes.string.isRequired,
      down: React.PropTypes.number.isRequired,
    })).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      url: '',
    };
  }
  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }
  handleDialogOpen(url) {
    this.setState({ dialogOpen: true, url });
  }
  handleDownload(url) {
    ipcRenderer.send('download-image', url);// directly send signal to main process.
  }
  handleWallpaper(url) {
    ipcRenderer.send('set-wallpaper', url);
  }
  render() {
    return (
      <ScrollBars style={{ height: '100%' }} autoHide autoHideTimeout={200}>
        <section className="grid">
          {this.props.tiles.map(tile => (
            <Paper key={tile.key} className="grid__item" zDepth={1}>
              <figure
                onTouchTap={() => this.handleDialogOpen(tile.big)}
                style={{
                  backgroundColor: this.props.muiTheme.palette.primary1Color,
                  backgroundImage: `url(${tile.small})`,
                }}
                className="grid__figure"
              />
              <figcaption className="grid__figcaption">
                <span className="download-stat">{tile.down}</span>
                <IconButton
                  onTouchTap={() => this.handleDownload(tile.big)}
                >
                  <FileDownload />
                </IconButton>
                <IconButton
                  onTouchTap={() => this.handleWallpaper(tile.big)}
                >
                  <Wallpaper />
                </IconButton>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    primaryText="Preview"
                    onTouchTap={() => this.handleDialogOpen(tile.big)}
                  />
                  <Divider />
                  <MenuItem
                    primaryText="Set as Wallpaper"
                    onTouchTap={() => this.handleWallpaper(tile.big)}
                  />
                  <MenuItem
                    primaryText="Download Wallpaper"
                    onTouchTap={() => this.handleWallpaper(tile.big)}
                  />
                </IconMenu>
              </figcaption>
            </Paper>
          ))}
          <div style={{ flex: 'auto' }} />
        </section>
        <Dialog
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose.bind(this)}
          contentStyle={{
            width: '90vw',
            height: '90vh',
            maxWidth: '90vw',
          }}
        >
          <img
            src={this.state.url}
            alt="preview"
            style={{
              width: '90vw',
              maxHeight: '90vh',
              objectFit: 'cover',
              margin: '-24px',
              display: 'block',
            }}
          />
        </Dialog>
      </ScrollBars>
    );
  }
});
