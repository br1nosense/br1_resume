<template>
  <div>
    <div class="topmenu">
      <div class="topmenu_left">
        <span>OmO简历</span>
      </div>

      <div class="topmenu_center">
        <div class="topmenu_item">模板中心</div>
        <div class="topmenu_item" @click="dialogVisible = true">字体/字号</div>
        <div class="topmenu_item">
          <el-color-picker v-model="color1" style="margin-top:5px"></el-color-picker>
        </div>
        <div class="topmenu_item">
          <el-button @click="toImage" :loading="downloadLoading">下载</el-button>
        </div>
        <!-- <div class="topmenu_item">
          <el-button @click="domToPdfBase64">分享</el-button>
        </div> -->
        <div class="topmenu_item">
          <el-button @click="savedata">保存</el-button>
        </div>
      </div>

      <div class="topmenu_right">个人中心</div>
    </div>

    <div class="content">
      <FirstResume ref="firstresume" :resumeinfo="resumeData" :edititem="edititem" v-if="isRouterAlive" />
    </div>
    <div class="bottom">
      <el-fade-in-linear>
        <EditModule ref="editmodule" :resumeinfo="resumeData" :edititem="edititem" @callback="callback" />
      </el-fade-in-linear>
    </div>
    <el-dialog title="字体/语言设置" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-row :gutter="20">
        <el-col :span="12" style="padding-left:20px">
          <div class="grid-content bg-purple">
            <span>
              字体 :
              <el-select v-model="font_family" placeholder="请选择">
                <el-option v-for="item in font_options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>
              文字大小 :
              <el-select v-model="font_size" placeholder="请选择">
                <el-option v-for="item in font_size_options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
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
import jsPDF from 'jspdf'
import html2canvas from "html2canvas";
import { eventBus } from "@/main";
import { setStore, getStore, removeStore } from "@/utils/storage.js";

import FirstResume from "./first_resume.vue";
import EditModule from "../edit/edit_module.vue";
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
      nowtime: "",
      dialogVisible: false,
      downloadLoading:false,
      color1: this.GlobalCSS.accentcolor,
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
      edititem: [
        {
          name: "1",
          label: "基本信息",
          switch: true
        },
        {
          name: "2",
          label: "求职意向",
          switch: true
        },
        {
          name: "3",
          label: "教育背景",
          switch: true
        },
        {
          name: "4",
          label: "专业技能",
          switch: true
        },
        {
          name: "5",
          label: "项目经历",
          switch: true
        },
        {
          name: "6",
          label: "实习经历",
          switch: true
        },
        {
          name: "7",
          label: "技能特长",
          switch: true
        },
        {
          name: "8",
          label: "荣誉证书",
          switch: true
        },
        {
          name: "9",
          label: "自我评价",
          switch: true
        },
        {
          name: "10",
          label: "兴趣爱好",
          switch: true
        },
        {
          name: "11",
          label: "校园经历",
          switch: true
        },
        {
          name: "12",
          label: "自定义",
          switch: true
        }

        // "基本信息",
        // "求职意向",
        // "教育背景",
        // "专业技能",
        // "项目经历",
        // "校园经历",
        // "实习经验",
        // "技能特长",
        // "荣誉证书",
        // "自我评价",
        // "兴趣爱好"
      ],
      value: "",
      font_family: "",
      font_size: "",
      isRouterAlive: true,
      //简历数据
      resumeData: {
        //1.个人信息
        userinfo: {
          name: "",
          age: "",
          sex: "",
          height: "",
          weight: "",
          nation: "",
          nativeplace: "",
          phone: "",
          email: "",
          native: "",
          polical: "",
          marriage: "",
          experance: "",
          imgisshow: true,
          switch: true
        },
        //2.兴趣爱好
        hobby: {
          name: ["摄影", "睡觉", "书法", "剪辑", "跑步"],
          content: ""
        },
        //3.工作意向
        workhope: {
          career: "前端开发工程师",
          hopecity: "杭州/北京/上海",
          salary: "7000/月",
          entrytime: "立刻马上"
        },
        //4.教育
        educate: [
          {
            id: "1",
            start: "2018-09",
            end: "2022-06",
            name: "清华大学珠海学院",
            major: "社会摸鱼学",
            edurecord: "本科",
            content:
              "主修课程：英雄联盟战术课程，永杰无间振刀蕴含的哲学道理，绝地求生概论，穿越火线鬼跳的原理以及实现，高等射击课程"
          }
        ],
        //5.项目经历
        projectexp: [
          {
            id: "1",
            start: "2018-09",
            end: "2022-06",
            projectname: "清华大学珠海学院",
            post: "摸鱼一把好手",
            content: "asdasassdad",
            nowtime: false
          },
          {
            id: "2",
            projectstart: "2018-09",
            projectend: "2022-06",
            projectname: "清华大学珠海学院",
            projectrole: "摸鱼一把好手",
            content: "asdada999999999999999999999999",
            nowtime: false
          }
        ],
        //6.技能
        skill: {
          content: "摸鱼小能手",
          skillname: ""
        },
        //7.实习经验
        internshipexp: [
          {
            id: "1",
            start: "2021-09",
            end: "2021-12",
            post: "前端开发实习生",
            name: "无意传媒",
            content:
              "主修课程：英雄联盟战术课程，永杰无间振刀蕴含的哲学道理，绝地求生概论，穿越火线鬼跳的原理以及实现，高等射击课程",
            nowtime: false
          }
        ],
        //8.奖项
        honner: {
          content: ""
        },
        //9.自我评价
        evaluation: {
          content: ""
        },
        //10.专业技能
        specialty: {
          content: "",
          name: ["画画"]
        },
        //11.校园经历
        schoolexp: [
          {
            id: "1",
            start: "2021-09",
            end: "2021-12",
            post: "前端开发实习生",
            name: "无意传媒",
            content:
              "主修课程：英雄联盟战术课程，永杰无间振刀蕴含的哲学道理，绝地求生概论，穿越火线鬼跳的原理以及实现，高等射击课程",
            nowtime: false
          },
          {
            id: "2",
            start: "2022-01",
            end: "2022-06",
            post: "前端开发工程师",
            name: "无意传媒",
            content: "vue+react 的开发",
            nowtime: false
          }
        ],
        customize: [
          {
            id: "1",
            start: "2022-01",
            end: "2022-06",
            post: "前端开发工程师",
            name: "无意传媒",
            content: "vue+react自定义 的开发",
            nowtime: false
          }
        ]
      }

    };
  },
  created() {
    this.resumeData = JSON.parse(getStore("resumeinfo"));
    this.autosave();
    this.gettime();
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    toImage() {
        this.downloadLoading = true
      let targetDom = this.$refs.firstresume.$refs.imageresume
      html2canvas(targetDom, {
        allowTaint: false,
        scale: 2,
        logging: false,
        useCORS: true,
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        let imgUrl = dataURL;
        // 创建一个a标签，用来下载图片
        var eleLink = document.createElement("a");
        // 转换后的图片地址
        eleLink.href = imgUrl;
        // 文件名设置
        eleLink.download = "默认文件名";
        // 下载
        eleLink.click();
        if (this.imgUrl !== "") {
          this.dialogTableVisible = true;
        }
        this.downloadLoading = false
        
      }).catch(()=>{
        this.downloadLoading = false
      })
    },
    savedata(){
      //localstorage保存对象需要转化成字符串
      setStore('resumeinfo',this.resumeData)
           this.$notify({
        title: "保存成功",
        message: "简历信息于" + this.nowtime + "保存成功",
        type: "success",
        duration: "5000"
      });
    },
    getresumeData(){
      
    },
    domToPdfBase64(targetId, printOrientation) {
      let targetDom = this.$refs.firstresume.$refs.imageresume //你的目标元素id
      var copyDom = targetDom.cloneNode(true) // 克隆节点
      copyDom.style.width = targetDom.offsetWidth + 'px'
      copyDom.style.height = targetDom.scrollHeight + 'PX' // 获得高度
      document.body.appendChild(copyDom) // 插入节点
      html2canvas(copyDom).then((canvas) => {
        document.body.removeChild(copyDom) // 删除节点
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 595.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 595.28 / contentWidth * contentHeight;
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        //第一个参数： l：横向  p：纵向;第二个参数：测量单位（"pt"，"mm", "cm", "m", "in" or "px"）;第三个参数：可以是下面格式，默认为“a4”
        var pdf = new jsPDF(printOrientation, 'pt', 'a4');
        if (leftHeight < pageHeight) {
          // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else { // 分页
          while (leftHeight > 10) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 871.89;
            //避免添加空白页
            if (leftHeight > 10) {
              pdf.addPage();
            }
          }
        }
        let pdf64 = pdf.output("datauristring").replace("data:application/pdf;base64,", "");
        console.log(pdf64);
        //pdf预览
        let blob = base64ToBlob(pdf64);
        //获取当前url，直接放到iframe就能用，下载同理。直接将blobURL放到浏览器可以预览
        let blobURL = window.URL.createObjectURL(blob);
        console.log(blobURL);
        return pdf64;
      })
    },
    gettime() {
      setInterval(() => {
        let d = new Date();
        this.nowtime =
          d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        // console.log(this.nowtime);
      }, 5000);
    },
    callback(data) {
      this.resumeData = data;
    },
    open1() {
      // this.$notify({
      //   title: "自动保存成功",
      //   message: "简历信息于" + this.nowtime + "保存成功",
      //   type: "success",
      //   duration: "5000"
      // });
    },
    autosave() {
      setInterval(() => {
        // this.resumeData = JSON.parse(window.localStorage.getItem("resumeinfo"))
        console.log("自动保存");
        this.open1();
      }, 5000);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
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
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }
  },
  mounted() { },
  watch: {
    data() {
      this.getuserinfo();
    },
    color() {
      window.less.modifyVars({
        "@accent-color": color1
      });
    }
  }
};
</script>

<style  lang="less" scoped>
@global-font-size: 16px;

.index {
  background-color: rgb(65, 65, 65);
}

.topmenu {
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  position: fixed;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;

  .topmenu_left {
    width: 300px;
    text-align: center;
  }

  .topmenu_right {
    width: 300px;
    text-align: center;
  }

  .topmenu_center {
    display: flex;
    text-align: center;
    line-height: 50px;
    height: 50px;

    .topmenu_item {
      margin: 0px 10px;
      text-align: center;
    }

    .topmenu_item:hover {
      border-bottom: 1px solid @accent-color;
      color: @accent-color;
      cursor: pointer;
      transform: scale(1.01);
    }
  }
}

p {
  color: @primaryTextColor;
}

.content {
  padding-top: 70px;
}
</style>