<template>
    <div style="background-color: #fff;height: 100vh">
        <div style="padding: 2rem 0;display: flex;justify-content: center">
            <img src="../assets/images/logo.jpg" style="width: 2.5rem;height: 2.5rem">
        </div>
        <van-row type="flex" justify="center">
            <van-cell-group class="field">
                <van-field
                        v-model="cardNo"
                        placeholder="请输入卡号"
                        clearable
                        maxlength="5"
                        type="number"
                        autofocus="true"

                />
                <van-field
                        v-model="cardPw"
                        placeholder="请输入密码"
                        maxlength="6"
                        type="password"
                        clearable
                />
                <van-field
                        v-model="port"
                        placeholder="请输入企业码"
                        maxlength="6"
                        type="password"
                        clearable
                />
            </van-cell-group>
        </van-row>
        <van-row type="flex" justify="center" style="margin-top:2rem;">
            <van-button round type="primary" style="width:90%" @click="login">登&nbsp;&nbsp;录</van-button>
        </van-row>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import * as api from '../api/home-api'

    export default {
        name: 'Index',
        data () {
            return {
                num: 0,
                cardNo: '',
                cardPw: '',
                port: ''
            }
        },
        methods: {
            login () {
                const vm = this
                let params = {
                    card_code: this.cardNo,
                    card_pwd: this.cardPw,
                    company_code: this.port
                }
                let alertMsg = ''
                if (params.card_code === '') {
                    alertMsg = '卡号不能为空'
                    Toast({
                        message: alertMsg
                    })
                    return
                }
                if (params.card_pwd === '') {
                    alertMsg = '密码不能为空'
                    Toast({
                        message: alertMsg
                    })
                    return
                }
                if (params.company_code === '') {
                    alertMsg = '企业码不能为空'
                    Toast({
                        message: alertMsg
                    })
                    return
                }
                api.login(params).then((res) => {
                    const { data } = res
                    const { code, msg } = data
                    if (code === 0) {
                        const { token } = msg
                        localStorage.setItem('token', token)
                        vm.$router.push({ path: '/detail' })
                    } else {
                        Toast({
                            message: msg,
                        })
                    }
                }).catch((err) => {
                    Toast({
                        message: err,
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .field {
        width: 90%;
    }
</style>
