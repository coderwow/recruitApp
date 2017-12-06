import axios from 'axios'
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
    redirectTo: '',
    msg:'',
    user:'',
    type:''
}
export function user(state=initState, action) {
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg:action.msg}
        default:
            return state
    }
}
export function loadData(userinfo) {
    return {type:LOAD_DATA, payload:userinfo}
}
function authSuccess(obj) {
    const {pwd, ...data} = obj;
    return {type:AUTH_SUCCESS, payload: data}
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res=>{
                if (res.status==200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

function errorMsg(msg) {
    return {type: ERROR_MSG, msg}
}
export function login({user, pwd}) {
    if (!user||!pwd) {
        return errorMsg('请输入用户名和密码')
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if (res.status==200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function regisger({user, pwd, repeatpwd, type}) {
    if (!user || !pwd) {
        return errorMsg('请输入用户名和密码')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('用户名密码必须相同')
    }
    return dispatch=>{
        axios.post('/user/register',{user, pwd, type})
            .then(res=>{
                if (res.status===200 && res.data.code===0) {
                    dispatch(authSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}