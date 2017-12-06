import React from 'react'
import {List, InputItem, TextareaItem, NavBar, Button} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            company: '',
            money: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect&&redirect!==path ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar>BOSS信息页</NavBar>
                <AvatarSelector
                    selectAvatar={imgname => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                />
                <List>
                    <InputItem
                        onChange={v=>this.onChange('title', v)}>招聘职位</InputItem>
                    <InputItem
                        onChange={(v)=>this.onChange('company',v)}>公司名称</InputItem>
                    <InputItem
                        onChange={(v)=>this.onChange('money',v)}>职位薪资</InputItem>
                    <TextareaItem
                        onChange={(v)=>this.onChange('desc',v)}
                        rows={3}
                        autoHeight
                        title="职位描述"/>
                    <Button
                        onClick={()=>{this.props.update(this.state)}}
                        type="primary">保存</Button>
                </List>
            </div>
        )
    }
}

export default BossInfo