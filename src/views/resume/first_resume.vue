<template>
  <div class="resume" ref="imageresume">
    <div class="left-column">
      <div class="avatar">
        <img src="../../../src/assets/img/bfr.jpg" alt class="img" v-show="resumeinfo.userinfo.imgisshow" />
      </div>
      <div class="left-info">
        <div class="left-info-top">
          <div class="left-item">
            <span class="left-item-title">
              <i class="el-icon-date" id="left-icon" />
            </span>
            <span class="left-item-text">{{ resumeinfo.userinfo.age }} 岁</span>
          </div>
          <div class="left-item">
            <span class="left-item-title">
              <i class="el-icon-male" id="left-icon"></i>
            </span>
            <span class="left-item-text">{{ resumeinfo.userinfo.sex }}</span>
          </div>

          <div class="left-item">
            <span class="left-item-title">
              <i class="el-icon-phone" id="left-icon"></i>
            </span>
            <span class="left-item-text">{{ resumeinfo.userinfo.height }}cm/{{ resumeinfo.userinfo.weight }}Kg</span>
          </div>
          <div class="left-item">
            <span class="left-item-title">
              <i class="el-icon-s-flag" id="left-icon"></i>
            </span>
            <span class="left-item-text">{{ resumeinfo.userinfo.nation }}</span>
          </div>
          <div class="left-item">
            <span class="left-item-title">
              <i class="el-icon-s-home" id="left-icon"></i>
            </span>
            <span class="left-item-text">{{ resumeinfo.userinfo.native }}</span>
          </div>
          <div class="left-item">
            <span class="left-item-title">
              <i class="el-icon-phone" id="left-icon"></i>
            </span>
            <span class="left-item-text">{{ resumeinfo.userinfo.phone }}</span>
          </div>
          <div class="left-item">
            <span class="left-item-title">
              <i class="el-icon-message" id="left-icon"></i>
            </span>
            <span class="left-item-text">{{ resumeinfo.userinfo.email }}</span>
          </div>
          <div class="hobby_module" v-show="resumeinfo.hobby.switch">
            <div class="hobby_tit" style="color:aliceblue;font-weight:700">兴趣爱好</div>

            <div class="edutext" v-html="resumeinfo.hobby.content"></div>
          </div>
          <div class="left_hobby">
            <div class="left_hobby_item" v-for="(item, index) in resumeinfo.hobby.name" :key="index">
              <div class="hobby">{{ item }}</div>
            </div>
          </div>
        </div>
        <div class="left-info-center"></div>
        <div class="left-info-bottom"></div>
      </div>
    </div>
    <div class="left-column-bg"></div>
    <div class="right-column">
      <div class="right-content" ref="module_content">
        <div class="right-name">{{ resumeinfo.userinfo.name }}</div>
        <div class="right-work" v-show="edititem[1].switch">
          <div class="work_hope">
            <div class="work_hope_item">求职意向: {{ resumeinfo.workhope.career }}</div>
            <div class="work_hope_item">意向城市：{{ resumeinfo.workhope.hopecity }}</div>
          </div>
          <div class="work_hope">
            <div class="work_hope_item">期望薪资：{{ resumeinfo.workhope.salary }}</div>
            <div class="work_hope_item">入职时间：{{ resumeinfo.workhope.entrytime }}</div>
          </div>
        </div>
        <!-- 通过v-for遍历，改变index下标改变dom元素的顺序 -->
        <div class="resume_module" v-for="(item, index) in edititem" :key="index">
          <div v-if="item.label == '教育背景'" v-show="item.switch">
            <div class="module-tit">{{ item.label }}</div>
            <div class="module-content" v-for="(info, indexj) in resumeinfo.educate" :key="indexj">
              <div class="eduinfo">
                <div class="timeinfo_item" v-if="!info.nowtime">{{ info.start }} ~ {{ info.end }}</div>
                <div class="timeinfo_item" v-else>{{ info.start }} ~ 至今</div>
                <b class="eduinfo_item">{{ info.name }}</b>
                <b class="eduinfo_item" style="padding-right:0rem">{{ info.major }}</b>
                <b class="eduinfo_item" style="  padding: 0.2rem 1rem 0.2rem 0rem;">{{ info.edurecord }}</b>
              </div>
              <div class="edutext" v-html="info.content"></div>
            </div>
          </div>
          <div v-if="item.label == '实习经历'" v-show="item.switch">
            <div class="module-tit">{{ item.label }}</div>
            <div class="module-content" v-for="(info, indexj) in resumeinfo.internshipexp" :key="indexj">
              <div class="eduinfo">
                <div class="timeinfo_item" v-if="!info.nowtime">{{ info.start }} ~ {{ info.end }}</div>
                <div class="timeinfo_item" v-else>{{ info.start }} ~ 至今</div>

                <b class="eduinfo_item">{{ info.name }}</b>
                <b class="eduinfo_item" style="padding-right:0rem">{{ info.post }}</b>
              </div>
              <div class="edutext" v-html="info.content"></div>
            </div>
          </div>
          <div v-if="item.label == '校园经历'" v-show="item.switch">
            <div class="module-tit">{{ item.label }}</div>
            <div class="module-content" v-for="(info, indexj) in resumeinfo.schoolexp" :key="indexj">
              <div class="eduinfo">
                <div class="timeinfo_item" v-if="!info.nowtime">{{ info.start }} ~ {{ info.end }}</div>
                <div class="timeinfo_item" v-else>{{ info.start }} ~ 至今</div>

                <b class="eduinfo_item">{{ info.name }}</b>
                <b class="eduinfo_item" style="padding-right:0rem">{{ info.post }}</b>
              </div>
              <div class="edutext" v-html="info.content"></div>
            </div>
          </div>
          <div v-if="item.label == '项目经历'" v-show="item.switch">
            <div class="module-tit">{{ item.label }}</div>
            <div class="module-content" v-for="(info, indexj) in resumeinfo.projectexp" :key="indexj">
              <div class="eduinfo">
                <div class="timeinfo_item" v-if="!info.nowtime">{{ info.start }} ~ {{ info.end }}</div>
                <div class="timeinfo_item" v-else>{{ info.start }} ~ 至今</div>

                <b class="eduinfo_item">{{ info.name }}</b>
                <b class="eduinfo_item" style="padding-right:0rem">{{ info.post }}</b>
              </div>
              <div class="edutext" v-html="info.content"></div>
            </div>
          </div>
          <div v-if="item.label == '荣誉证书'" v-show="item.switch">
            <div class="module-tit">{{ item.label }}</div>
            <div class="module-content">
              <div class="skill" v-html="resumeinfo.honner.content"></div>
            </div>
          </div>
          <div v-if="item.label == '自我评价'" v-show="item.switch">
            <div class="module-tit">{{ item.label }}</div>
            <div class="module-content">
              <div class="skill" v-html="resumeinfo.evaluation.content"></div>
            </div>
          </div>
          <div v-if="item.label == '专业技能'" v-show="item.switch">
            <div class="module-tit">{{ item.label }}</div>
            <div class="module-content">
              <div class="skill" v-html="resumeinfo.skill.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "first_resume",
  data() {
    return {
      resumeData: {}
    };
  },
  props: {
    edititem: {
      default() {
        return {};
      }
    },
    resumeinfo: {
      default() {
        return {};
      }
    }
  },
  methods: {
  },
  created() {
  },
  watch: {
    resumeinfo() { }
  }
};
</script>

<style lang="less" scoped>
@global-font-size : 16px;

.resume {
  background-color: #fff;
  // padding-top: 1rem;
  width: @A4width;
  height: @A4height;
  margin: 0 auto;

}

.left-column {
  width: @A4width * 0.3;
  height: @A4height;
  text-align: left;
  float: left;
  color: #ffffff;
  background-color: @accent-color;
  overflow: hidden;
  display: block;
  z-index: 2;

  opacity: 1; // lower this value (0.7 approx.) to see the cover image
  position: absolute;
}

.right-column {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  float: right;
  height: @A4height;
  z-index: 3;
  width: @A4width * 0.7;

  .right-content {
    width: 32rem;
    padding-left: 10px;

    .right-work {
      .work_hope {
        display: flex;

        .work_hope_item {
          font-size: @global-font-size;
          box-sizing: border-box;
          padding: 0 5px 0 0;
          width: 200px;
          white-space: nowrap;
        }
      }
    }
  }

  .right-name {
    color: @accent-color;
    margin: 0.5rem;
    font-size: @global-font-size*2;
    font-weight: 700;
  }
}

.resume_module {

  // padding-bottom: 0.8rem;
  .module-tit {
    color: @accent-color;
    line-height: 30px;
    height: 33 px;
    width: 100%;
    font-size: 16px;
    position: relative;
    margin-left: 40 px;
    z-index: 99;
    border-bottom: 1px solid @accent-color;
    font-weight: 700;
    white-space: nowrap;
    padding-top: 10px;
  }

  .module-content {}
}

.avatar {
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;

  .img {
    border: 1px solid #fff;
    text-align: center;
    margin: 0 auto;
    width: 5rem * 1.5;
    height: 7rem * 1.5;
    background-color: #fff;
  }
}

.left-item {
  padding: 0.2rem 0.8rem 0.2rem 0.8em;
  word-break: break-all;

  .left-item-title {
    color: white;
    font-size: @global-font-size;
    font-weight: bold;
  }

  .left-item-text {
    color: white;
    font-size: @global-font-size;
    padding-left: 0.5rem;
    font-weight: bold;
  }
}

#left-icon {
  border: 1px solid #fff;
  // background-color: rgb(37, 37, 37);
  padding: @global-font-size * 0.1;
  // margin: @global-font-size*0.5 @global-font-size*0.5;
  border-radius: 50%;
  font-weight: 100;
}

.eduinfo {
  display: flex;
}

.eduinfo_item {
  white-space: nowrap;
  color: @accent-color;
  font-size: @global-font-size;
  padding: 0.2rem 1rem 0.2rem 0rem;
}

.edutext {
  font-size: @global-font-size;

  .ul {
    padding: 0rem !important;
  }
}

.skill {
  font-size: @global-font-size;

  li {
    margin: 0.1rem;
    padding: 0.2rem;
  }
}

.timeinfo_item {
  white-space: nowrap;
  color: @accent-color;
  font-size: @global-font-size;
  padding: 0.2rem 1rem 0.2rem 0rem;
  width: 150px;
}

.hobby_module {
  padding: 0 0 0 0.8rem;
}

.hobby_tit {
  padding-top: 20px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}

.left_hobby {
  padding: 0px 0px;
  display: flex;
  width: 70%;
  flex-flow: row wrap;

  .left_hobby_item {
    padding: 10px;

    .hobby {
      margin: auto;
      color: rgb(0, 0, 0);
      text-align: center;
      border-radius: 15px;
      width: 100%;
      padding: 3px 5px;
      max-width: 150px;
      height: 25px;
      line-height: 25px;
      border: 1px solid rgba(0, 0, 0, 0.281);
      background-color: rgb(236, 236, 236);
    }
  }
}
</style>