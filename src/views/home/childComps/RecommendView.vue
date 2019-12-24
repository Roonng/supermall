<template>
  <div id="recommend">
    <div v-for="item in recommends" class="recommendItem">
      <a :href="item.link">
        <img :src="item.image"/>
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends:{
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommendItem{
    flex: 1;
  }
  .recommendItem img{
    height: 70px;
    width: 70px;
    margin-bottom: 6px;
  }

</style>
