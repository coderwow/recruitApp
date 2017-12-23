import React from 'react'
import Logo from '../../component/logo/logo'
import {WhiteSpace, WingBlank, InputItem, List, Button, Radio} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {regisger} from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form.js'
@connect(
    state=>state.user,
    {regisger}
)
@imoocFrom
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    handleRegister() {
        this.props.regisger(this.props.state)
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
                            onChange={v=>this.props.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=>this.props.handleChange('pwd', v)}
                            type='password'>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=>this.props.handleChange('repeatpwd',v)}
                            type='password'>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.props.state.type==="genius"}
                            onChange={()=>this.props.handleChange('type','genius')}>牛人</RadioItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.props.state.type==='boss'}
                            onChange={()=>this.props.handleChange('type','boss')}
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