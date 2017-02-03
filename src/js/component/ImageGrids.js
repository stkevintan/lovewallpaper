import React from 'react';
import ScrollReveal from 'scrollreveal';
import ScrollBars from 'react-custom-scrollbars';

import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';

import Divider from 'material-ui/Divider';

import Image from './Image';

export default class ImageGrids extends React.Component {
  static propTypes = {
    tiles: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      small: React.PropTypes.string.isRequired,
      big: React.PropTypes.string.isRequired,
      down: React.PropTypes.number.isRequired,
    })).isRequired,
    handleMore: React.PropTypes.func.isRequired,
    handleDownload: React.PropTypes.func.isRequired,
    handleSet: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      url: '',
    };
    this.sr = ScrollReveal();
  }
  componentDidUpdate() {
    this.sr.reveal('.grid__item', { container: document.querySelector('.scrollarea > div') });
  }
  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }
  handleDialogOpen(url) {
    this.setState({ dialogOpen: true, url });
  }
  handleWinScroll(e) {
    const elem = e.target;
    const limit = elem.scrollHeight - elem.clientHeight - 290;
    if (window.CanSendLoadMoreSignal && elem.scrollTop >= limit) {
      window.CanSendLoadMoreSignal = false;
      console.log('load more...');
      this.props.handleMore();
    }
  }
  render() {
    window.CanSendLoadMoreSignal = true;
    return (
      <ScrollBars
        className="scrollarea"
        style={{ height: '100%' }}
        autoHide
        autoHideTimeout={200}
        onScroll={this.handleWinScroll.bind(this)}
      >
        <section className="grid">
          {this.props.tiles.map(tile => (
            <Paper key={tile.key} className="grid__item" zDepth={1}>
              <figure
                onTouchTap={() => this.handleDialogOpen(tile.big)}
                className="grid__figure"
              >
                <Image src={tile.small} />
              </figure>
              <figcaption className="grid__figcaption">
                <span className="download-stat">{tile.down}</span>
                <IconButton
                  onTouchTap={() => this.props.handleDownload(tile.big)}
                >
                  <FileDownload />
                </IconButton>
                <IconButton
                  onTouchTap={() => this.props.handleSet(tile.big)}
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
                    onTouchTap={() => this.props.handleSet(tile.big)}
                  />
                  <MenuItem
                    primaryText="Download Wallpaper"
                    onTouchTap={() => this.props.handleDownload(tile.big)}
                  />
                </IconMenu>
              </figcaption>
            </Paper>
          ))}
          {
            // generate enough blank block to fill space
            Array.from({ length: 10 }).map((v, i) => (
              <div key={i} style={{ width: '290px', height: 0 }} />
            ))
          }
        </section>
        <Dialog
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose.bind(this)}
          contentStyle={{
            width: '90vw',
            height: '80vh',
            maxWidth: '90vw',
          }}
        >
          <Image
            src={this.state.url}
            onTouchTap={this.handleDialogClose.bind(this)}
            style={{
              cursor: 'pointer',
              width: '90vw',
              height: '80vh',
              objectFit: 'cover',
              margin: '-24px',
              display: 'block',
            }}
          />
        </Dialog>
      </ScrollBars>
    );
  }
}
