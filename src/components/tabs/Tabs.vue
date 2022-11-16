<template>
  <div class="tabs">
    <div ref="navWrap" class="tabs-nav-wrap">
      <div class="tabs-inv-bar" :style="barStyle"></div>
      <div class="tabs-refresh" v-if="refresh">
        <div class="tabs-tab" v-for="(item,index) in Edititem " :key="index" ref="tab_title">
          <el-tooltip class="item" effect="dark" content="向左移动模块" placement="top-start">
            <span class="icon-right" @click="tabchangeleft(index)">
              <p class="el-icon-arrow-left" style />
            </span>
          </el-tooltip>
          <el-switch
            v-model="item.switch"
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="height:15px;text-align:center"
            @change="switchchange(item,index)"
          ></el-switch>
          <el-tooltip class="item" effect="dark" content="向右移动模块" placement="top-start">
            <span class="icon-right" @click="tabchangeright(index)">
              <p class="el-icon-arrow-right" style />
            </span>
          </el-tooltip>
          <br />
          <div class="tabs-title" @click="handleChange(index)">{{item.label}}</div>
        </div>
      </div>
    </div>
    <div class="pane-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Tabs",
  inject: ["reload"],
  provide() {
    return { TabsInstance: this };
  },
  created() {
    this.initTabs();
  },
  model: {
    prop: "value",
    event: "click"
  },

  props: {
    value: {
      type: [String, Number],

      default: 0
    },
    Edititem: {
      type: Array,
      default() {
        return [];
      }
    },
    maininfo: {
      default() {
        return {};
      }
    },
    moduleup: {
      type: Function,
      default: null
    },
    moduledown: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      navList: [],
      activeKey: 0,
      barWidth: 0,
      barOffset: 0,
      scrollable: false,
      navStyle: {
        transform: ""
      },
      activeIndex: 0,
      refresh: true,
      activekeyj: this.activeKey
    };
  },

  computed: {
    barStyle() {
      return {
        width: `${this.barWidth}px`,
        transform: `translate3d(${this.barOffset}px,0px,0px)`
      };
    }
  },
  methods: {
    //初始化更新
    initTabs() {
      this.updateNav();
      this.updateStatus();
      this.updateBar();
    },
    //获取tabs下的所有pane实例
    getTabs() {
      return this.$children.filter(item => item.$options.name === "TabPane");
    },
    //获取所有pane组件传入的props
    updateNav() {
      this.navList = [];
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        });
        //如果不传value,默认选中第一项
        if (index === 0 && !this.activeKey) {
          this.activeKey = pane.name;
        }
      });
    },
    switchchange() {
      this.reload();
    },
    handleChange(index) {
      //   const nav = this.navList[index];
      //name是哪里来的??name是调用组件时在标签传入的,也就是nav上的属性,这里有个bug,默认取到的是this.activekey==2???
      //   this.activekey = nav.name;

      let nav = this.navList[index];
      let name = nav.name;
      let label = nav.label;
      this.activeKey = index;
      this.$emit("click", name, label);
    },
    updateBar() {
      //等待dom更新完毕后获取dom节点
      this.$nextTick(() => {
        //当前选中的activeKey下标
        const index = this.navList.findIndex(
          nav => nav.name === this.activeKey
        );
        //获取navwarp元素下所有tab的值
        const elemTabs = this.$refs.navWrap.querySelectorAll(".tabs-tab");
        //获取当前选择的元素
        const elemTab = elemTabs[index];
        this.barWidth = elemTab ? elemTab.offsetWidth : 0;
        //计算需要移动的距离,当index>0时进行累加
        if (index > 0) {
          let offset = 0;
          for (let i = 0; i < index; i++) {
            offset += elemTabs[i].offsetWidth;
          }
          this.barOffset = offset;
        } else {
          this.barOffset = 0;
        }
      });
    },
    updateStatus() {
      const tabs = this.getTabs();
      tabs.forEach(tab => (tab.showcontent = tab.name === this.activeKey));
    },
    tabchangeleft(index) {
      if (index > 0) {
        //置换atbitem下标
        let temp;
        temp = this.navList[index];
        this.navList[index] = this.navList[index - 1];
        this.navList[index - 1] = temp;
        this.refresh = false;
        //使用v-if刷新
        const _this = this;

        this.$nextTick(() => {
          _this.refresh = true;
        });
        this.moduleup(index);
      }
    },
    tabchangeright(index) {
      if (index < 11) {
        let temp;
        temp = this.navList[index];
        this.navList[index] = this.navList[index + 1];
        this.navList[index + 1] = temp;
        this.refresh = false;
        const _this = this;
        this.$nextTick(() => {
          _this.refresh = true;
        });
        this.moduledown(index);

    
      } else {
        console.log("达咩达咩达咩");
      }
    }
  },
  watch: {
    value(val) {
      this.activeKey = val;

      this.activekeyj = this.activeKey;
    },
    activeKey() {
      this.updateStatus();
      this.updateBar();
    },
    maininfo() {
      this.resumeinfo = this.maininfo;
    }
  }
};
</script>

<style>
.tabs-nav-wrap {
  border-bottom: 1px solid #dcdee2;
  margin-bottom: 16px;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 99;
}
.tabs-tab {
  display: inline-block;
  text-align: center;
  padding: 8px 0px;
  cursor: pointer;
}
.tabs-refresh {
}
.tabs-inv-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #2d8cf0;
  height: 2px;
  transition: transform 300ms ease-in-out;
}
.tabs-title {
  /* background-color: #09f; */
  color: rgb(0, 0, 0);
}
.pane-content {
}
.el-icon-arrow-left {
  border-radius: 100%;
  width: 18px;
  height: 18px;
  border: 1px solid rgb(255, 255, 255);
  line-height: 18px;
  margin: 5px;
  vertical-align: middle;
  left: 10%;
  color: #dcdee2;

  background-color: rgba(21, 137, 214, 0.3);
}
.el-icon-arrow-right {
  border-radius: 100%;
  width: 18px;
  height: 18px;
  border: 1px solid rgb(255, 255, 255);
  line-height: 18px;
  margin: 5px;
  vertical-align: middle;
  right: 50%;
  background-color: #fff;

  color: #dcdee2;

  background-color: rgba(21, 137, 214, 0.3);
}
.icon-right {
  border-radius: 100%;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.icon-right :hover {
  background-color: rgba(21, 137, 214, 0.8);
}
</style>