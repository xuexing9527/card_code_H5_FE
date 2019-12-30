<template>
    <div>
        <van-address-edit
                :area-list="areaList"
                show-delete
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
    import areaList  from '../assets/js/area'
    export default {
        name: 'Detail',
        data () {
            return {
                areaList,
                searchResult: []
            }
        },
        methods: {
            onSave() {
                // console.log(res) // eslint-disable-line
            },
            onDelete() {
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                        name: '黄龙万科中心',
                        address: '杭州市西湖区'
                    }];
                } else {
                    this.searchResult = [];
                }
            }
        }
    }
</script>

<style scoped>
</style>
