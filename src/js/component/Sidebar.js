import React from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import ScrollBars from 'react-custom-scrollbars';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { setSidebarStatus } from '../action/ui';

const SideBarLink = ({ to, children }) => (
  <Link
    to={to}
    style={{
      color: 'inherit',
      textDecoration: 'none',
      display: 'block',
    }}
    activeStyle={{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }}
  >
    {children}
  </Link>
);

const transform = iarr => iarr.map(imap => imap.get('name')).toArray();
const mapStateToProps = state => ({
  show: state.getIn(['ui', 'sidebar', 'show']),
  category: transform(state.getIn(['metadata', 'category'])),
  everyday: transform(state.getIn(['metadata', 'everyday'])),
});
const mapDisPatcherToProps = dispatch => bindActionCreators({
  setSidebarStatus,
}, dispatch);
@connect(mapStateToProps, mapDisPatcherToProps)
export default class extends React.Component {
  static propTypes={
    show: React.PropTypes.bool.isRequired,
    setSidebarStatus: React.PropTypes.func.isRequired,
    category: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    everyday: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      catIsOpen: false,
    };
  }
  handleCatListToggle() {
    this.setState({ catIsOpen: !this.state.catIsOpen });
  }
  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={300}
          open={this.props.show}
          onRequestChange={() => this.props.setSidebarStatus(false)}
        >
          <ScrollBars autoHide>
            <List>
              <SideBarLink key="recommend" to="/image/recommend">
                <ListItem onTouchTap={() => this.props.setSidebarStatus(false)}>
                  推荐壁纸
                </ListItem>
              </SideBarLink>
              <SideBarLink key="wallpaper" to="/image/wallpaper">
                <ListItem onTouchTap={() => this.props.setSidebarStatus(false)}>
                  试试手气
                </ListItem>
              </SideBarLink>
              <SideBarLink key="ranking" to="/image/ranking">
                <ListItem onTouchTap={() => this.props.setSidebarStatus(false)}>
                  壁纸排行
                </ListItem>
              </SideBarLink>
              <ListItem
                key="category"
                primaryText="分类"
                initiallyOpen={false}
                primaryTogglesNestedList
                nestedItems={
                  this.props.category.map((name, index) => (
                    <SideBarLink key={index} to={`/image/category/${index}`}>
                      <ListItem onTouchTap={() => this.props.setSidebarStatus(false)}>
                        {name}
                      </ListItem>
                    </SideBarLink>
                  ))
                }
              />
              <ListItem
                key="everyday"
                primaryText="每日精选"
                initiallyOpen={false}
                primaryTogglesNestedList
                nestedItems={
                  this.props.everyday.map((name, index) => (
                    <SideBarLink key={index} to={`/image/everyday/${index}`}>
                      <ListItem onTouchTap={() => this.props.setSidebarStatus(false)}>
                        {name}
                      </ListItem>
                    </SideBarLink>
                  ))
                }
              />
            </List>
          </ScrollBars>
        </Drawer>
      </div>
    );
  }
}

