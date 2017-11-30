import React from 'react'
import Logo from '../../component/logo/logo'
import {WhiteSpace, WingBlank, InputItem, List, Button, Radio} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {regisger} from '../../redux/user.redux'
@connect(
    state=>state.user,
    {regisger}
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleRegister() {
        this.props.regisger(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v=>this.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=>this.handleChange('pwd', v)}
                            type='password'>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=>this.handleChange('repeatpwd',v)}
                            type='password'>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.state.type=="genius"}
                            onChange={()=>this.handleChange('type','genius')}>牛人</RadioItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.state.type=='boss'}
                            onChange={()=>this.handleChange('type','boss')}
                        >BOSS</RadioItem>
                        <WhiteSpace/>
                        <Button
                            type="primary"
                            onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>

        )
    }
}

export default Register