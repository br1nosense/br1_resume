<template>
  <div class="edit_all">
    <div class="edit_pull" @click="pullup">
      <i class="el-icon-arrow-up" v-if="pullstage==0" />
      <i class="el-icon-arrow-down" v-else />
    </div>
    <div class="edit_main" ref="editmain">
      <div class="edit_box" ref="panecontent">
        <Tabs
          :Edititem="edititem"
          class="edit_item"
          v-model="activeIndex"
          :maininfo="resumeinfo"
          :moduleup="moduleup"
          :moduledown="moduledown"
        >
          <TabPane name="1" label="基本信息">
            <!-- 第一行 -->
            <el-form :inline="true" class="demo-form-inline" :model="resumeData.userinfo">
              <div class="form_box">
                <el-form-item label="您的姓名">
                  <el-input placeholder="输入您的姓名" v-model="resumeData.userinfo.name"></el-input>
                </el-form-item>

                <el-form-item label="年 龄" style="letter-spacing:8px">
                  <el-input
                    placeholder="请输入您的年龄"
                    v-model="resumeData.userinfo.age"
                    style="width:234px"
                  ></el-input>
                </el-form-item>

                <el-form-item label="联系电话">
                  <el-input placeholder="请输入您的联系电话" v-model="resumeData.userinfo.phone"></el-input>
                </el-form-item>

                <el-form-item label="联系邮箱">
                  <el-input placeholder="输入您的联系邮箱" v-model="resumeData.userinfo.email"></el-input>
                </el-form-item>
              </div>
            </el-form>
            <!-- 第二行 -->
            <el-form :inline="true" class="demo-form-inline" :model="resumeData.userinfo">
              <div class="form_box">
                <el-form-item label="工作年限">
                  <el-select
                    placeholder="不填"
                    style="width:205px"
                    v-model="resumeData.userinfo.experance"
                  >
                    <el-option label="不填" value></el-option>
                    <el-option label="应届" value="应届"></el-option>
                    <el-option label="半年" value="半年"></el-option>
                    <el-option label="一年" value="一年"></el-option>
                    <el-option label="两年" value="两年"></el-option>
                    <el-option label="三年" value="三年"></el-option>
                    <el-option label="四年" value="四年"></el-option>
                    <el-option label="五年" value="五年"></el-option>
                    <el-option label="六年" value="六年"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="照片设置">
                  <el-button type="primary" round style="margin:0 10px">上传照片</el-button>
                  <el-checkbox style="padding:0 20px" :v-model="resumeData.userinfo.imgisshow">显示照片</el-checkbox>
                </el-form-item>

                <el-form-item label="性 别" style="letter-spacing:5px">
                  <el-select
                    placeholder="请选择性别"
                    style="width:205px"
                    v-model="resumeData.userinfo.sex"
                  >
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="婚姻状况">
                  <el-select
                    placeholder="请选择性别"
                    style="width:205px"
                    v-model="resumeData.userinfo.marriage"
                  >
                    <el-option label="未婚" value="1"></el-option>
                    <el-option label="已婚" value="2"></el-option>
                    <el-option label="离异" value="3"></el-option>
                    <el-option label="已婚已育" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
            <!-- 第三行 -->
            <el-form :inline="true" class="demo-form-inline" :model="resumeData.userinfo">
              <div class="form_box">
                <el-form-item label="身 高" style="letter-spacing:5px">
                  <el-input
                    placeholder="身高"
                    style="width:70px"
                    v-model="resumeData.userinfo.height"
                  ></el-input>
                </el-form-item>

                <el-form-item label="体 重" style="letter-spacing:5px">
                  <el-input
                    placeholder="体重"
                    style="width:70px"
                    v-model="resumeData.userinfo.weight"
                  ></el-input>
                </el-form-item>

                <el-form-item label="民 族" style="letter-spacing:8px">
                  <el-input
                    placeholder="民族"
                    style="width:234px "
                    v-model="resumeData.userinfo.nation"
                  ></el-input>
                </el-form-item>
                <el-form-item label="籍 贯" style="letter-spacing:5px; margin-left:15px">
                  <el-input placeholder="籍贯" v-model="resumeData.userinfo.native"></el-input>
                </el-form-item>
                <el-form-item label="政治面貌">
                  <el-select placeholder="政治面貌" v-model="resumeData.userinfo.polical">
                    <el-option label="不填" value></el-option>
                    <el-option label="中共党员" value="中共党员"></el-option>
                    <el-option label="中共预备党员" value="中共预备党员"></el-option>
                    <el-option label="共青团员" value="共青团员"></el-option>
                    <el-option label="普通公民" value="普通公民"></el-option>
                    <el-option label="群众" value="群众"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </TabPane>
          <TabPane name="2" label="求职意向">
            <el-form :inline="true" class="demo-form-inline" :model="resumeData.workhope">
              <div class="form_box">
                <el-form-item label="求职意向">
                  <el-input placeholder="输入您的求职意向" v-model="resumeData.workhope.career"></el-input>
                </el-form-item>

                <el-form-item label="意向城市">
                  <el-input
                    placeholder="请输入您的意向城市"
                    v-model="resumeData.workhope.hopecity"
                    style="width:234px"
                  ></el-input>
                </el-form-item>

                <el-form-item label="期望薪资">
                  <el-input placeholder="请输入期望薪资" v-model="resumeData.workhope.salary"></el-input>
                </el-form-item>

                <el-form-item label="入职时间">
                  <el-select
                    placeholder="不填"
                    style="width:205px"
                    v-model="resumeData.workhope.entrytime"
                  >
                    <el-option label="不填" value></el-option>
                    <el-option label="一周内到岗" value="一周内到岗"></el-option>
                    <el-option label="一个月内到岗" value="一个月内到岗"></el-option>
                    <el-option label="另行商议" value="另行商议"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </TabPane>
          <TabPane name="3" label="教育背景">
            <div v-if="refresh">
              <el-form
                :inline="true"
                class="demo-form-inline"
                v-for="(item,index) in resumeData.educate"
                :key="index"
                style="height:300px"
              >
                <div class="form_box">
                  <el-form-item label="学校名称">
                    <el-input placeholder="输入您的学校名称" v-model="item.name" style="width:150px"></el-input>
                  </el-form-item>

                  <el-form-item label="所学专业">
                    <el-input placeholder="请输入您的所学专业" v-model="item.major" style="width:150px"></el-input>
                  </el-form-item>

                  <el-form-item label="就读时间">
                    <el-date-picker
                      style="width:115px"
                      v-model="item.start"
                      type="month"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM"
                    ></el-date-picker>
                    <span style="padding:0px 5px">~</span>
                    <el-date-picker
                      style="width:115px"
                      v-model="item.end"
                      type="month"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM"
                    ></el-date-picker>

                    <el-checkbox style="padding:0px 10px" v-model="item.nowtime">至今</el-checkbox>
                  </el-form-item>

                  <el-form-item label="学 历" style="letter-spacing:8px">
                    <el-select placeholder="不填" v-model="item.edurecord">
                      <el-option label="不填" value></el-option>
                      <el-option label="初中" value="初中"></el-option>
                      <el-option label="高中" value="高中"></el-option>
                      <el-option label="中专" value="中专"></el-option>
                      <el-option label="大专" value="大专"></el-option>
                      <el-option label="本科" value="本科"></el-option>
                      <el-option label="学士" value="学士"></el-option>
                      <el-option label="硕士" value="硕士"></el-option>
                      <el-option label="博士" value="博士"></el-option>
                      <el-option label="MBA" value="MBA"></el-option>
                      <el-option label="EMBA" value="EMBA"></el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div class="editor">
                  <quill-editor
                    v-model="item.content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)"
                    style="height:150px;width:1100px;"
                  ></quill-editor>

                  <div class="controlbtn">
                    <div class="controlbtn_item">
                      <el-button
                        icon="el-icon-arrow-up"
                        circle
                        @click="expup(resumeData.educate,index)"
                      ></el-button>
                    </div>
                    <div class="controlbtn_item">
                      <el-button
                        icon="el-icon-arrow-down"
                        circle
                        @click="expdown(resumeData.educate,index)"
                      ></el-button>
                    </div>
                    <div class="controlbtn_item">
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="deleteexp(resumeData.educate,index)"
                      ></el-button>
                    </div>
                  </div>
                </div>
              </el-form>
              <div class="globalline"></div>
              <el-button style="margin-bottom:20px" @click="addnewexp(resumeData.educate)">新增一条教育经历</el-button>
            </div>
          </TabPane>
          <TabPane name="4" label="专业技能">
            <el-form :inline="true" class="demo-form-inline" :model="resumeData.skill">
              <div class="form_box">
                <quill-editor
                  v-model="resumeData.skill.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)"
                  style="height:150px;width:1100px;"
                ></quill-editor>
              </div>
            </el-form>
          </TabPane>
          <TabPane name="5" label="项目经历">
            <div v-if="refresh">
              <el-form
                :inline="true"
                class="demo-form-inline"
                v-for="(item,index) in resumeData.projectexp"
                :key="index"
                style="height:300px"
              >
                <div class="form_box">
                  <el-form-item label="项目名称">
                    <el-input placeholder="请输入项目名称" v-model="item.name"></el-input>
                  </el-form-item>

                  <el-form-item label="担任角色">
                    <el-input placeholder="请输入担任角色" v-model="item.post"></el-input>
                  </el-form-item>

                  <el-form-item label="项目时间">
                    <el-date-picker
                      style="width:115px"
                      v-model="item.start"
                      type="month"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM"
                    ></el-date-picker>
                    <span style="padding:0px 5px">~</span>
                    <el-date-picker
                      style="width:115px"
                      v-model="item.end"
                      type="month"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM"
                    ></el-date-picker>
                  </el-form-item>
                  <el-checkbox style="padding:10px 0px" v-model="item.nowtime">至今</el-checkbox>
                  <div class="editor">
                    <quill-editor
                      v-model="item.content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                      @change="onEditorChange($event)"
                      style="height:150px;width:1100px;"
                    ></quill-editor>
                    <div class="controlbtn">
                      <div class="controlbtn_item">
                        <el-button
                          icon="el-icon-arrow-up"
                          circle
                          @click="expup(resumeData.projectexp,index)"
                        ></el-button>
                      </div>
                      <div class="controlbtn_item">
                        <el-button
                          icon="el-icon-arrow-down"
                          circle
                          @click="expdown(resumeData.projectexp,index)"
                        ></el-button>
                      </div>
                      <div class="controlbtn_item">
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="deleteexp(resumeData.projectexp,index)"
                        ></el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
              <div class="globalline"></div>
              <el-button
                style="margin-bottom:20px"
                @click="addnewexp(resumeData.projectexp)"
              >新增一条项目经历</el-button>
            </div>
          </TabPane>
          <TabPane name="6" label="实习经历">
            <el-form
              :inline="true"
              class="demo-form-inline"
              v-for="(item,index) in resumeData.internshipexp "
              style="height:300px"
              :key="index"
            >
              <div class="form_box">
                <el-form-item label="项目名称">
                  <el-input placeholder="请输入项目名称" v-model="item.name"></el-input>
                </el-form-item>

                <el-form-item label="担任角色">
                  <el-input placeholder="请输入担任角色" v-model="item.post"></el-input>
                </el-form-item>

                <el-form-item label="项目时间">
                  <el-date-picker
                    style="width:115px"
                    v-model="item.start"
                    type="month"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM"
                  ></el-date-picker>
                  <span style="padding:0px 5px">~</span>
                  <el-date-picker
                    style="width:115px"
                    v-model="item.end"
                    type="month"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM"
                  ></el-date-picker>
                </el-form-item>
                <el-checkbox style="padding:10px 0px" v-model="item.nowtime">至今</el-checkbox>
              </div>

              <div class="editor">
                <quill-editor
                  v-model="item.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)"
                  style="height:150px;width:1100px;"
                ></quill-editor>

                <div class="controlbtn">
                  <div class="controlbtn_item">
                    <el-button
                      icon="el-icon-arrow-up"
                      circle
                      @click="expup(resumeData.internshipexp,index)"
                    ></el-button>
                  </div>
                  <div class="controlbtn_item">
                    <el-button
                      icon="el-icon-arrow-down"
                      circle
                      @click="expdown(resumeData.internshipexp,index)"
                    ></el-button>
                  </div>
                  <div class="controlbtn_item">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="deleteexp(resumeData.internshipexp,index)"
                    ></el-button>
                  </div>
                </div>
              </div>
            </el-form>
            <div class="globalline"></div>
            <el-button
              style="margin-bottom:20px"
              @click="addnewexp(resumeData.internshipexp)"
            >新增一条实习经历</el-button>
          </TabPane>
          <TabPane name="7" label="技能特长">
            <el-tag
              style="margin:0px 5px"
              :key="tag"
              v-for="tag in resumeData.specialty.name"
              closable
              :disable-transitions="false"
              @close="handleClose(resumeData.specialty.name,tag,label)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(resumeData.specialty.name)"
              @blur="handleInputConfirm(resumeData.specialty.name)"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加自定义技能</el-button>
            <div class="globalline"></div>

            <quill-editor
              v-model="resumeData.specialty.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)"
              style="height:150px"
            ></quill-editor>
          </TabPane>
          <TabPane name="8" label="荣誉证书">
            <quill-editor
              v-model="resumeData.honner.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)"
              style="height:150px"
            ></quill-editor>
          </TabPane>
          <TabPane name="9" label="自我评价">
            <quill-editor
              v-model="resumeData.evaluation.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)"
              style="height:150px"
            ></quill-editor>
          </TabPane>
          <TabPane name="10" label="兴趣爱好">
            <el-tag
              style="margin:0px 5px"
              :key="tag"
              v-for="tag in resumeData.hobby.name"
              closable
              :disable-transitions="false"
              @close="handleClose(resumeData.hobby.name,tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(resumeData.hobby.name)"
              @blur="handleInputConfirm(resumeData.hobby.name)"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加自定义兴趣爱好</el-button>
            <div class="globalline"></div>

            <quill-editor
              v-model="resumeData.hobby.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)"
              style="height:150px;"
            ></quill-editor>
          </TabPane>
          <TabPane name="11" label="校园经历">
            <el-form
              :inline="true"
              class="demo-form-inline"
              v-for="(item,index) in resumeData.schoolexp"
              :key="index"
              style="height:350px"
            >
              <div class="form_box">
                <el-form-item label="项目名称">
                  <el-input placeholder="请输入项目名称" v-model="item.name"></el-input>
                </el-form-item>

                <el-form-item label="担任角色">
                  <el-input placeholder="请输入担任角色" v-model="item.post"></el-input>
                </el-form-item>

                <el-form-item label="项目时间">
                  <el-date-picker
                    style="width:115px"
                    v-model="item.start"
                    type="month"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM"
                  ></el-date-picker>
                  <span style="padding:0px 5px">~</span>
                  <el-date-picker
                    style="width:115px"
                    v-model="item.end"
                    type="month"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM"
                  ></el-date-picker>
                </el-form-item>
                <el-checkbox style="padding:10px 0px" v-model="item.nowtime">至今</el-checkbox>
              </div>

              <div class="controlbtn">
                <div class="controlbtn_item">
                  <el-button
                    icon="el-icon-arrow-up"
                    circle
                    @click="expup(resumeData.schoolexp,index)"
                  ></el-button>
                </div>
                <div class="controlbtn_item">
                  <el-button
                    icon="el-icon-arrow-down"
                    circle
                    @click="expdown(resumeData.schoolexp,index)"
                  ></el-button>
                </div>
                <div class="controlbtn_item">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteexp(resumeData.schoolexp,index)"
                  ></el-button>
                </div>
              </div>
              <quill-editor
                v-model="item.content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)"
                style="width:1100px;"
              ></quill-editor>
            </el-form>
            <div class="globalline"></div>
            <el-button style="margin-bottom:20px" @click="addnewexp(resumeData.schoolexp)">新增一条校园经历</el-button>
          </TabPane>
          <TabPane name="12" label="自定义">
            <el-form
              :inline="true"
              class="demo-form-inline"
              v-for="(item,index) in resumeData.customize"
              style="height:300px "
              :key="index"
            >
              <div class="form_box">
                <el-form-item label="项目名称">
                  <el-input placeholder="请输入项目名称" v-model="item.name"></el-input>
                </el-form-item>

                <el-form-item label="担任角色">
                  <el-input placeholder="请输入担任角色" v-model="item.post"></el-input>
                </el-form-item>

                <el-form-item label="项目时间">
                  <el-date-picker
                    style="width:115px"
                    v-model="item.start"
                    type="month"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM"
                  ></el-date-picker>
                  <span style="padding:0px 5px">~</span>
                  <el-date-picker
                    style="width:115px"
                    v-model="item.end"
                    type="month"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM"
                  ></el-date-picker>
                </el-form-item>
                <el-checkbox style="padding:10px 0px" v-model="item.nowtime">至今</el-checkbox>
              </div>

              <div class="editor">
                <quill-editor
                  v-model="item.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)"
                  style="height:150px;width:1100px;"
                ></quill-editor>

                <div class="controlbtn">
                  <div class="controlbtn_item">
                    <el-button
                      icon="el-icon-arrow-up"
                      circle
                      @click="expup(resumeData.customize,index)"
                    ></el-button>
                  </div>
                  <div class="controlbtn_item">
                    <el-button
                      icon="el-icon-arrow-down"
                      circle
                      @click="expdown(resumeData.customize,index)"
                    ></el-button>
                  </div>
                  <div class="controlbtn_item">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      @click="deleteexp(resumeData.customize,index)"
                    ></el-button>
                  </div>
                </div>
              </div>
            </el-form>
            <div class="globalline"></div>
            <el-button style="margin-bottom:20px" @click="addnewexp(resumeData.customize)">新增一条经历</el-button>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Tabs from "../../components/tabs/Tabs.vue";
import TabPane from "../../components/tabs/TabPane.vue";

export default {
  name: "EditModule",
  components: {
    Tabs,
    TabPane
  },
  inject: ["reload"],
  props: {
    resumeinfo: {
      default() {
        return {};
      }
    },
    edititem: {
      default() {
        return {};
      }
    }
  },
  created() {
    // console.log("编辑页面！！！");
    this.getresumeinfo();
    this.resumeinfo = JSON.parse(window.localStorage.getItem("resumeinfo"));
    this.autosave();
  },
  data() {
    return {
      activeIndex: "1",
      itemindex: 1,
      value: "",
      inputVisible: false,
      inputValue: "",
      resumeData: {},
      editorOption: {},
      refresh: true,
      pullstage: 1,
      // 富文本编辑器配置
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            // ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [
              {
                size: [
                  "12",
                  "14",
                  "16",
                  "18",
                  "20",
                  "22",
                  "24",
                  "28",
                  "32",
                  "36"
                ]
              }
            ], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: ['songti'] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"] // 清除文本格式
          ]
        },
        placeholder: "请输入正文"
      }
    };
  },

  methods: {
    //     open1() {
    //   this.$notify({
    //     title: "自动保存成功",
    //     message: "这是一条成功的提示消息",
    //     type: "success"
    //   });
    // },
    autosave() {
      setInterval(() => {
        window.localStorage.setItem(
          "resumeinfo",
          JSON.stringify(this.resumeData)
        );
        this.$emit("callback", this.resumeData);
      }, 1000);
    },
    getresumeinfo() {
      // return this.userinfo
      this.resumeData = this.resumeinfo;
      const _this = this;
      setInterval(function() {
        _this.resumeData = _this.resumeinfo;
      }, 1000);
    },
    //按键方法
    pullup() {
      this.$nextTick(() => {
        if (this.$refs.editmain.style.height === "70px") {
          this.$refs.editmain.style.height = "400px";

          this.pullstage = 1;
        } else {
          this.$refs.editmain.style.height = "70px";

          this.pullstage = 0;
        }
      });

      // console.log(btn);
    },
    //经历添加
    addnewexp(e) {
      let long = e.length;
      let obj = {
        id: long + 1,
        start: "",
        pend: "",
        name: "",
        post: "",
        content: "",
        nowtime: false
      };
      e.push(obj);
      console.log(e[long + 1]);
    },
    expup(e, index) {
      //编辑模块移动
      if (index != 0) {
        let temp;
        temp = e[index];
        console.log(e[index]);
        e[index] = e[index - 1];
        e[index - 1] = temp;
        this.refresh = false;
        const _this = this;
        this.$nextTick(() => {
          _this.refresh = true;
        });

        //简历模块移动

        this.reload();
      }
    },
    expdown(e, index) {
      if (index != e.length - 1) {
        var temp;
        temp = e[index];
        console.log(e[index]);
        e[index] = e[index + 1];
        e[index + 1] = temp;
        this.refresh = false;
        const _this = this;
        this.$nextTick(() => {
          _this.refresh = true;
        });

        this.reload();
      }
    },
    moduleup(index) {
      let tempj;
      tempj = this.edititem[index];
      this.edititem[index] = this.edititem[index - 1];
      this.edititem[index - 1] = tempj;
      this.reload();
    },
    moduledown(index) {
      let tempj;
      tempj = this.edititem[index];
      console.log(this.edititem[index]);
      this.edititem[index] = this.edititem[index + 1];
      this.edititem[index + 1] = tempj;
      this.reload();
    },
    deleteexp(e, index) {
      e.splice(index, 1);
      const _this = this;
      this.$nextTick(() => {
        _this.refresh = true;
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleMenuItemClick(path) {
      this.$router.push(path);
      this.currentMenuIndex = path;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    onEditorChange({ quill, html, text }) {
      // console.log("editor change!", quill, html, text);
      // this.resumeData.educate.content = html;
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorBlur() {},
    onEditorReady() {},

    //element tag标签方法

    handleClose(e, tag, label) {
      e.splice(e.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(e) {
      let inputValue = this.inputValue;
      if (inputValue) {
        e.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>

<style lang="less" scoped>
.edit_all {
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 99;
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
}
.edit_main {
  box-shadow: 0 0 20px rgb(0 0 0 / 20%);
  background-color: rgb(255, 255, 255);
  // -webkit-transition: all 0.3s ease-out 0s;
  // transition: all 0.3s ease-out 0s;
  transition: height 0s ease-in-out 0s;
  -webkit-transition: height 0.3s ease-in-out 0s;
  transform: translateY(100% -70px);
  max-height: 700px;
  overflow-y: scroll;
}
// .edit_main:hover{
//   height: 100%
// }
.edit_box {
  display: flex;
  width: 1200px;
  margin: 0 auto;

  .edit_item {
    margin: auto;
  }
}
.edit_pull {
  cursor: pointer;
  position: absolute;
  text-align: center;
  margin: 0 auto -30px auto;
  background-color: rgb(255, 255, 255);
  width: 50px;
  height: 50px;
  z-index: -1;
  top: -25px;
  left: 50%;
  border-radius: 50%;
  border: 1px solid #fff;

  animation-duration: 4s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
}
.edit_pull:hover {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  transition-delay: 0s;
  margin-top: -5px;
  transition-duration: 300ms;
}
.el-form {
}
.form_box {
  width: 1180px;

  .item_box {
  }
}
.el-input {
  width: 205px;
}
.el-select {
  width: 205px;
}
.demo-form-inline {
  /* 划分行列 */
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(4, 100px);
}
.globalline {
  margin: 10px 0px 20px 0px;
  border: 1px dashed rgba(10, 10, 10, 0.062);
}
.el-form-item {
  // margin-bottom:10px
}

.editor {
  margin-bottom: 100px;
  display: flex;
}
.controlbtn {
  float: right;
  margin: 25px 0px 0px 25px;
  .controlbtn_item {
    margin-bottom: 10px;
  }
}
</style>