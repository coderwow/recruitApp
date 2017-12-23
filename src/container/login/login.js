import React from 'react'
import Logo from '../../component/logo/logo'
import {WhiteSpace, WingBlank, InputItem, List, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form.js'

@connect(
    state=>state.user,
    {login}
)
@imoocFrom
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    register() {
        this.props.history.push('/register');
    }
    handleLogin() {
        this.props.login(this.props.state)
    }
    render() {
        return (
            <div>
                {this.props.redirectTo&& this.props.redirectTo!=="/login" ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem
                            onChange={v=>this.props.handleChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=>this.props.handleChange('pwd',v)}
                            type='password'>密码</InputItem>
                        <WhiteSpace/>
                        <Button
                            onClick={this.handleLogin}
                            type="primary">登录</Button>
                        <WhiteSpace/>
                        <Button
                            onClick={this.register}
                            type="primary">注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Login