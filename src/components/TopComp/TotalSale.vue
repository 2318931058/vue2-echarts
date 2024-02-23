<template>
    <div class="total-sale">
        <CommonCard title="累计销售额" :value="reportData.salesToday">
            <template default>
                <div>
                    <span>日同比</span>
                    <span class="css-1">{{ reportData.salesGrowLastDay }}</span>
                    <span class="increase"></span>
                </div>
                <div>
                    <span>月同比</span>
                    <span class="css-1">{{ reportData.saleSGrowLastMonth }}</span>
                    <span class="increase"></span>
                </div>
            </template>
            <template #footer>
                <span>昨日销售额</span>
                <span class="css-1">￥{{ reportData.salesLastDay }}</span>
            </template>
        </CommonCard>

    </div>
</template>

<script>
import CommonCard from './CommonCard.vue'

export default {
  props: ['reportData'],
  components: { CommonCard }
}
</script>

<style lang="scss" scoped>

</style>
