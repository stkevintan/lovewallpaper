import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
// import ScrollReveal from 'scrollreveal';

import ScrollBars from 'react-custom-scrollbars';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import { debounce } from 'lodash';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';

import Divider from 'material-ui/Divider';

import Image from './Image';
import Lazyload from './Lazyload';

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
      scrollDOM: undefined,
    };
    // add debounce
    this.handleWinScroll = debounce(this.handleWinScroll, 200);
  }
  componentDidMount() {
    // fuck react/no-did-mount-set-state
    this.setState({ scrollDOM: ReactDOM.findDOMNode(this.scrollarea).firstElementChild });
  }
  @autobind
  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  @autobind
  handleDialogOpen(url) {
    this.setState({ dialogOpen: true, url });
  }

  @autobind
  handleWinScroll(e) {
    const elem = e.target;
    const limit = elem.scrollHeight - elem.clientHeight - 290;
    if (window.CanSendLoadMoreSignal && elem.scrollTop >= limit) {
      window.CanSendLoadMoreSignal = false;
      this.props.handleMore();
    }
  }
  styles = {
    dialogImage: {
      cursor: 'pointer',
      width: '90vw',
      height: '80vh',
      objectFit: 'cover',
      margin: '-24px',
      display: 'block',
    },
    dialog: {
      width: '90vw',
      height: '80vh',
      maxWidth: '90vw',
    },
  }
  // generate enough blank block to fill space
  zfillElements = Array.from({ length: 10 }).map((v, i) => (
    <div key={i} style={{ width: '290px', height: 0 }} />
  ))
  render() {
    window.CanSendLoadMoreSignal = true;
    return (
      <ScrollBars
        className="scrollarea"
        style={{ height: '100%' }}
        autoHide
        autoHideTimeout={200}
        onScroll={this.handleWinScroll}
        ref={scrollarea => this.scrollarea = scrollarea}
      >
        <section className="grid">
          {this.props.tiles.map(tile => (
            <Lazyload className="grid__item" key={tile.key} parentDOM={this.state.scrollDOM}>
              <Paper zDepth={1}>
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
            </Lazyload>
          ))}
          {this.zfillElements}
        </section>
        <Dialog
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
          contentStyle={this.styles.dialog}
        >
          <Image
            src={this.state.url}
            onTouchTap={this.handleDialogClose}
            style={this.styles.dialogImage}
          />
        </Dialog>
      </ScrollBars>
    );
  }
}
