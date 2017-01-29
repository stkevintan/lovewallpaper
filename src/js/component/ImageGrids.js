import React from 'react';

import Paper from 'material-ui/Paper';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

export default class ImageGrids extends React.Component {
  static propTypes = {
    tiles: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      small: React.PropTypes.string.isRequired,
      big: React.PropTypes.string.isRequired,
      down: React.PropTypes.number.isRequired,
    })).isRequired,
  }
  render() {
    return (
      <section className="grid">
        {this.props.tiles.map(tile => (
          <Paper key={tile.key} className="grid__item" zDepth={1}>
            <figure style={{ backgroundImage: `url(${tile.small})` }} className="grid__figure" />
            <figcaption className="grid__figcaption">
              <IconButton><FileDownload /></IconButton>
              <span className="download-stat">{tile.down}</span>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem primaryText="Detail" />
                <MenuItem primaryText="More Like This" />
                <MenuItem primaryText="Set as Wallpaper" />
                <Divider />
                <MenuItem primaryText="Remove" />
              </IconMenu>
            </figcaption>
          </Paper>
        ))}
      </section>
    );
  }
}
