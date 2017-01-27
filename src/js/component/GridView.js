import React from 'react';

import Paper from 'material-ui/Paper';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

const tilesData = [
  {
    img: 'http://s.qdcdn.com/c/14326266,1920,1080.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'http://keyin.me/images/avatar.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'http://keyin.me/images/avatar.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'http://keyin.me/images/avatar.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'http://keyin.me/images/avatar.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'http://keyin.me/images/avatar.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'http://keyin.me/images/avatar.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'http://keyin.me/images/avatar.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];
export default class WallpaperGridView extends React.Component {
  render() {
    return (
      <section className="grid">
        {tilesData.map(tile => (
          <Paper key={tile.title} className="grid__item" zDepth={1}>
            <figure style={{ backgroundImage: `url(${tile.img})` }} className="grid__figure" />
            <figcaption className="grid__figcaption">
              <IconButton><StarBorder /></IconButton>
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
