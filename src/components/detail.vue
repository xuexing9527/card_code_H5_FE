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
        <div>
            <!--通知信息-->
            <van-notice-bar
                    text="注：1、地址提示：填写详细地址，避免电话未接听配送不成功，快递退回带来不必要的麻烦。2、兑换商品为：五斤精品牛肉+一只散养土鸡。3、收货前，请妥善保存卡号密码，以便查询运单号等订单详情。"
            />
            <!--分割线-->
            <van-divider
                    content-position="left"
                    :style="{ color: '#333', borderColor: '#333', padding: '0 0.32rem' }"
            >
                收货地址填写
            </van-divider>
            <!--地址填写-->
            <van-cell-group style="margin: 0 0.32rem;border-radius:5%;">
                <van-field
                        v-model="name"
                        label="姓名"
                        placeholder="收货人姓名"
                        clearable="true"
                        autofocus
                />
                <van-field
                        v-model="tel"
                        label="电话"
                        placeholder="收货人手机号"
                        type="number"
                        maxlength="11"
                        minlength="11"
                        clearable
                />
                <van-field
                        v-model="tel"
                        readonly
                        label="地区"
                        placeholder="请选择省 / 市 / 区"
                        @click="showPopup"
                />
                <!--<van-cell is-link @click="showPopup" title="地区">{{address}}</van-cell>-->
                <van-field
                        v-model="addressDetail"
                        label="详细地址"
                        placeholder="街道门牌、 楼层房间号等信息"
                        clearable
                />
                <van-field
                        v-model="note"
                        rows="1"
                        autosize
                        label="留言"
                        type="textarea"
                        clearable
                        placeholder="请输入留言"
                />
            </van-cell-group>
            <!--兑换按钮-->
            <van-row type="flex" justify="center" style="margin-top:1rem;">
                <van-button round type="danger" style="width:90%" @click="onSave">确认兑换</van-button>
            </van-row>

            <!--省市区选择弹框-->
            <van-popup
                    v-model="show"
                    position="bottom"
                    :style="{ height: '50%' }"
            >
                <van-area
                        :area-list="areaList"
                        :columns-placeholder="['请选择', '请选择', '请选择']"
                        @cancel="closePopup"
                        @confirm="getAddress"
                />
            </van-popup>
        </div>
        <!--已填写订单地址显示界面-->
        <!--<div v-if="isQuery">-->
        <!--<van-notice-bar-->
        <!--text="注：新鲜牛肉和土鸡，下单一周之后发货，请耐心等待。"-->
        <!--/>-->
        <!--<van-address-list-->
        <!--:list="list"-->
        <!--:switchable='switchable'-->
        <!--style="margin-top: 0.32rem"-->
        <!--/>-->
        <!--<van-panel title="下单时间" :desc="add_time" style="margin:0.32rem 0.32rem 0">-->
        <!--</van-panel>-->
        <!--<van-steps :active="active" style="margin:0 0.32rem">-->
        <!--<van-step>买家下单</van-step>-->
        <!--<van-step>商家接单</van-step>-->
        <!--<van-step>商家发货</van-step>-->
        <!--</van-steps>-->
        <!--<van-panel v-if="active==2"  title="韵达快递" :desc="tracking_number" style="margin:0.32rem 0.32rem 0">-->
        <!--</van-panel>-->
        <!--</div>-->
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
                name: '',
                tel: '',
                address: '请选择省 / 市 / 区',
                addressDetail: '',
                note: '',
                areaList,
                active: 1,
                isEdit: false,
                isQuery: false,
                list: [],
                add_time: '',
                tracking_number: '',
                switchable: true,
                show: false,

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
            showPopup() {
                this.show = true
            },
            closePopup() {
                this.show = false
            },
            getAddress(res) {
                const province = res[0]
                const city = res[1]
                const county = res[2]

                if (province === undefined || province.code === '') {
                    Toast({
                        message: '请选择省份'
                    })
                    return
                }

                if (city === undefined || city.code === '') {
                    Toast({
                        message: '请选择市'
                    })
                    return
                }

                if (county === undefined || county.code === '') {
                    Toast({
                        message: '请选择区'
                    })
                    return
                }

                this.address = province.name === city.name ? city.name + county.name : province.name + city.name + county.name
                this.show = false

            },
            onSave() {
                const vm = this

                if (vm.name === '') {
                    Toast({
                        message: '请填写收货人姓名'
                    })
                    return
                }

                if (vm.tel === '') {
                    Toast({
                        message: '请填写收货人电话'
                    })
                    return
                } else {
                    const mobile = /^1(3|4|5|6|7|8|9)\d{9}$/
                    if (!mobile.test(vm.tel)) {
                        Toast({
                            message: '您填写的电话号码有误'
                        })
                        return
                    }
                }

                if (vm.address === '请选择省 / 市 / 区') {
                    Toast({
                        message: '请选择省市区'
                    })
                    return
                }

                if (vm.addressDetail === '') {
                    Toast({
                        message: '请填写详细地址'
                    })
                    return
                }

                let params = {
                    consignee: vm.name,
                    phone_number: vm.tel,
                    address: vm.address+vm.addressDetail,
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
