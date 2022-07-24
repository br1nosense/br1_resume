<template>
  <div class="listCard">
    <div
      class="listCardItem"
      v-for="(item, index) in listCardData"
      :key="index"
      @click="clickListCardItem(item.movie_id)"
    >
      <div class="image">
        <img :src="server + item.poster" alt />
      </div>
      <div>
        <div class="title">
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ListCard",
  props: {
    listCardData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      //服务器地址
      server: "http://localhost:3000"
    };
  },
  methods: {
    //封面点击的参数传递
    clickListCardItem(id) {
      this.$emit("clickListCardItem", id);
    }
  }
};
</script>

<style scoped>
.listCard {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
}

.listCardItem {
  margin: 20px 100px 50px 0;
  cursor: pointer;
}

.listCardItem:nth-child(5n) {
  margin-right: 0;
}

.image {
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  position: relative;
}

.image::after {
  content: "";
  width: 150px;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/img/imgLoading.png") no-repeat center;
  background-size: contain;
  border-radius: 10px;
  z-index: -1;
}

.image img {
  width: 150px;
  height: 200px;
  box-shadow: 10px 10px 20px 10px rgba(24, 24, 24, 0.5),
    10px 10px 10px 10px rgba(180, 180, 180, 0.2);
}

.title {
  width: 150px;
  height: 40px;
  position: relative;
  bottom: -10px;
  z-index: 99;
  font-size: 16px;
  font-weight: 100;
  color: rgb(255, 255, 255);

  /* 背景渐变色 */
  background: linear-gradient(to top, rgb(0, 0, 0), rgba(108, 108, 108, 0.7));

  /* 垂直居中显示 */
  display: table-cell;
  vertical-align: middle;
}
.name {
  margin-left: 5px;
  margin-right: 5px;
  float: left;
  width: 100px;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mcore {
  font-style: italic;
  font-weight: 1000;
  color: rgb(255, 0, 0);
}
.subbutton {
  margin: 11px 0 0 0;
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  width: 150px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;

  color: #ef4238;
  font-weight: 100;
  box-shadow: 10px 10px 20px 10px rgba(24, 24, 24, 0.5),
    10px 10px 10px 10px rgba(180, 180, 180, 0.2);
}
.subbutton:hover {
  font-size: 16px;
  background-color: rgb(255, 0, 0);
  color: rgb(255, 255, 255);
}
</style>