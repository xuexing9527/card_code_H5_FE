<template>
    <div>
        <van-row type="flex" justify="center" style="margin: 2rem 0;">
            <img src="../assets/images/logo.jpg" style="width: 2.5rem;">
        </van-row>
        <van-row type="flex" justify="center">
            <van-cell-group class="field">
                <van-field
                        v-model="port"
                        placeholder="请输入企业码"
                        clearable
                />
                <van-field
                        v-model="cardNo"
                        placeholder="请输入卡号"
                        clearable
                        size="large"
                        maxlength="5"
                        type="number"
                        autofocus="true"

                />
                <van-field
                        v-model="cardPw"
                        placeholder="请输入密码"
                        clearable
                        right-icon="eye"
                />
            </van-cell-group>
        </van-row>
        <van-row type="flex" justify="center" style="margin-top:2rem;">
            <van-button round type="primary" style="width:90%">登&nbsp;&nbsp;录</van-button>
        </van-row>
    </div>
</template>

<script>
  export default {
    name: "Index"
  }
</script>

<style scoped>
    .field {
        width: 90%;
    }
</style>
