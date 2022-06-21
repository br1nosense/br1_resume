<template>
  <div class="index">
    <div class="topmenu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">模板中心</el-menu-item>
        <el-menu-item index="2" @click="dialogVisible = true">字体/字号</el-menu-item>
        <el-menu-item index="3">
          <el-color-picker v-model="color1"></el-color-picker>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
      <FirstResume ref="firstresume" @resumeinfo="getuserinfo" />
    </div>
    <div class="bottom">
      <EditModule ref="editmodule" :resumeinfo="resumeData" />
    </div>
    <el-dialog
      title="字体/语言设置"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-row :gutter="20">
        <el-col :span="12" style="padding-left:20px">
          <div class="grid-content bg-purple">
            <span>
              字体:
              <el-select v-model="font_family" placeholder="请选择">
                <el-option
                  v-for="item in font_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>
              文字大小:
              <el-select v-model="font_size" placeholder="请选择">
                <el-option
                  v-for="item in font_size_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { eventBus } from "@/main";

import FirstResume from "./resume/first_resume.vue";
import EditModule from "./edit/edit_module.vue";
import { setTheme } from "../theme/theme";
import { ref } from "vue";

export default {
  name: "Index",
  components: {
    FirstResume,
    EditModule
  },
  setup() {
    return {
      selectedKeys: ref(["2"])
    };
  },
  data() {
    return {
      dialogVisible: false,
      color1:'',
      font_size_options: [
        {
          value: "12",
          label: "12"
        },
        {
          value: "13",
          label: "13",
          disabled: true
        },
        {
          value: "14",
          label: "14"
        },
        {
          value: "15",
          label: "15"
        },
        {
          value: "16",
          label: "16"
        }
      ],
      font_options: [
        {
          value: "font_1",
          label: "微软雅黑"
        },
        {
          value: "font_2",
          label: "宋体",
          disabled: true
        },
        {
          value: "font_3",
          label: "黑体"
        },
        {
          value: "font_4",
          label: "楷体"
        }
      ],
      value: "",
      font_family: "",
      font_size: "",
      resumeData: []
    };
  },
  created() {
    // console.log(this.resumeData);
    console.log(this.$refs);
  },
  methods: {
    getuserinfo(info) {
      // console.log(info);
      this.resumeData = info;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    init() {
      setTheme("default");
    },
    darkTheme() {
      setTheme("dark");
    },
    // 更改为自定义主题
    custom() {
      let newColor = {
        r: 12,
        g: 33,
        b: 234
      };
      let newPrimaryColor = `${newColor.r},${newColor.g},${newColor.b}`;
      localStorage.setItem("primaryColor", newPrimaryColor); // 将新的主题色存入本地
      setTheme();
    }
  },
  mounted() {},
  watch: {
    data() {
      this.getuserinfo();
    }
  }
};
</script>

<style  lang="less" scoped>
.index {
  background-color: rgb(65, 65, 65);
}
.topmenu {
}
.content {
  height: 1200px;
}
.bottom {
}
p {
  color: @primaryTextColor;
}
</style>