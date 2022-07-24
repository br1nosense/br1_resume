<template>
  <div class="main">
    <div class="top">
      <div class="title">
        <h2>Omo简历</h2>
        <div class="text1">白无意独立制作，永久免费的简历制作平台</div>
        <div class="text2">众多模板，欢迎交流学习</div>
        <div class="search">
          <input type="text" placeholder="需要什么模板~(￣▽￣)~*" />
        </div>
      </div>
      <div class="tiplist">
        <ul>
          <li>
            <h5>自动排版</h5>
            <p>输入内容，自动排版生成简历</p>
          </li>
          <li>
            <h5>自动排版</h5>
            <p>输入内容，自动排版生成简历</p>
          </li>
          <li>
            <h5>自动排版</h5>
            <p>输入内容，自动排版生成简历</p>
          </li>
          <li>
            <h5>自动排版</h5>
            <p>输入内容，自动排版生成简历</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="center">简历列表</div>
    <div class="bottom">底部</div>
  </div>
</template>

<script>
import ListCard from "@/components/listCard/listcard.vue";
import ResumeList from "../resumelist/ResumeList.vue";
// import ListCard from '../../components/listCard/listcard.vue'

export default {
  components: {
    ListCard,
    ResumeList
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.main {
  width: 100%;
}
.top {
  position: relative;
  width: 100%;
  height: 400px;
  background-image: linear-gradient(130deg, #13d8a7, #0094b5);
}
.title {
  width: 100%;
  font-size: 3rem;
  text-align: center;

  .text1 {
    font-size: 2rem;
    margin: 1rem 0rem;
  }
  .text2 {
    font-size: 1.5rem;
    margin: 1rem 0rem;
  }
  .search {
    margin: auto;
    width: 400px;
    height: 80px;
    border: 1px solid rgb(142, 135, 146);
    font-size: 1rem;
    border-radius: 50px;
    input {
      font-size: 1rem;
      line-height: 80px;
      background-color: rgba(255, 255, 255, 0);
    }
  }
}
.tiplist {
  left: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  ul {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;

    li {
      float: left;
      width: 25%;
      padding: 20px;
    }
  }
}
</style>