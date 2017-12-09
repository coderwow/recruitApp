import React from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'


class UserCard extends React.Component {
    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.avatar ? (<Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        />
                        <Body>
                        {v.desc.split('\n').map(d=>(
                            <div key={d}>{d}</div>
                        ))}
                        </Body>
                    </Card>) : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard