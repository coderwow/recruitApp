import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
@withRouter
export default class NavLinkBar extends React.Component {
    render() {
        const navList = this.props.data.filter(v=>!v.hide);
        const {pathname} = this.props.location;
        return (
            <TabBar>
                {navList.map(v=> (
                    <TabBar.Item
                        key={v.path}
                        title={v.title}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={v.path===pathname}
                        onPress={()=> {
                            this.props.history.push(v.path)
                           }}
                    />
                )
                )}
            </TabBar>
        )
    }

    static propTypes = {
        data: PropTypes.array.isRequired
    }
}