<template>
    <div style="background-color: #EDEFF2;height: 100vh">
        <van-nav-bar
                title="订单详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <!--客服电话-->
        <van-notice-bar
                wrapable
                :scrollable="false"
                text="客服/微信：18811759402"
                style="margin-bottom: 0.32rem;"
                left-icon="chat-o"
        />

        <!--未填写订单地址显示界面-->
        <div v-if="isEdit">
            <!--通知信息-->
            <van-notice-bar
                    text="注：1、地址提示：填写详细地址，避免电话未接听配送不成功，快递退回带来不必要的麻烦。2、兑换商品为：五斤精品牛肉+一只散养土鸡。3、收货前，请妥善保存卡号密码，以便查询运单号等订单详情。"
            />
            <!--地址填写-->
            <van-divider
                    content-position="left"
                    :style="{ color: '#333', borderColor: '#333', padding: '0 0.32rem' }"
            >
                收货地址填写
            </van-divider>
            <van-address-edit
                    :area-list="areaList"
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    save-button-text="确认兑换"
                    style="padding-top: 0;"
            />
        </div>
        <!--已填写订单地址显示界面-->
        <div v-if="isQuery">
            <van-notice-bar
                    text="注：新鲜牛肉和土鸡，下单一周之后发货，请耐心等待。"
            />
            <van-address-list
                    :list="list"
                    :switchable='switchable'
                    style="margin-top: 0.32rem"
            />
            <van-panel title="下单时间" :desc="add_time" style="margin:0.32rem 0.32rem 0">
            </van-panel>
            <van-steps :active="active" style="margin:0 0.32rem">
                <van-step>买家下单</van-step>
                <van-step>商家接单</van-step>
                <van-step>商家发货</van-step>
            </van-steps>
            <van-panel v-if="active==2"  title="韵达快递" :desc="tracking_number" style="margin:0.32rem 0.32rem 0">
            </van-panel>
        </div>
    </div>
</template>

<script>
    import areaList  from '../assets/js/area'
    import * as api from '../api/home-api'
    import { Toast } from 'vant';
    export default {
        name: 'Detail',
        data () {
            return {
                areaList,
                active: 1,
                note: '',
                isEdit: false,
                isQuery: false,
                list: [],
                add_time: '',
                tracking_number: '',
                switchable: true
            }
        },
        beforeCreate () {
            const vm = this
            api.detail().then((res) => {
                const { data } = res
                const { code, msg } = data
                if (code === 0) {
                    vm.add_time = msg.add_time
                    vm.tracking_number = msg.tracking_number
                    vm.isEdit = !msg.ship_status
                    vm.isQuery = [1, 2].includes(msg.ship_status)
                    // active为订单的状态
                    vm.active = msg.ship_status
                    // list为地址的信息
                    vm.list = [
                        {
                            name:msg.consignee,
                            tel:msg.phone_number,
                            address: msg.address
                        }
                    ]
                } else {
                    Toast({
                        message: msg
                    })
                }
            }).catch((err) => {
               Toast({
                   message: err
               })
            })
        },
        methods: {
            onSave(res) {
                const { name, tel, province, city, county, addressDetail } = res
                const vm = this
                let params = {
                    consignee: name,
                    phone_number: tel,
                    address: province+city+county+addressDetail,
                    note: vm.note
                }
                api.add(params).then((res) => {
                    const { data } = res
                    const { code, msg } = data
                    if (code === 0) {
                        api.detail().then((res) => {
                            const { data } = res
                            const { code, msg } = data
                            if (code === 0) {
                                Toast.success('兑换成功')
                                setTimeout(()=> {
                                    vm.add_time = msg.add_time
                                    vm.tracking_number = msg.tracking_number
                                    vm.isEdit = !msg.ship_status
                                    vm.isQuery = [1, 2].includes(msg.ship_status)
                                    vm.active = msg.ship_status
                                    vm.list = [
                                        {
                                            name:msg.consignee,
                                            tel:msg.phone_number,
                                            address: msg.address
                                        }
                                    ]
                                },2000)
                            } else {
                                Toast({
                                    message: msg
                                })
                            }
                        }).catch((err) => {
                            Toast({
                                message: err
                            })
                        })
                    } else {
                        Toast({
                            message: msg
                        })
                    }
                }).catch((err) => {
                    Toast({
                        message: err
                    })
                })

            },
            onClickLeft () {
                this.$router.push({ path: '/' })
            }
        }
    }
</script>

<style scoped>
    .van-address-item__edit {
        display: none;
    }
    .van-address-list {
        padding: 0 0.32rem;
    }
    .van-address-list__bottom {
        display: none;
    }
</style>
