<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow">
        <div class="title">
          <h4>使用 OmO 账号 登录官网</h4>
        </div>
        <div class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <input type="text" placeholder="账号" />
              </div>
            </li>
            <li>
              <div class="input">
                <input type="password" placeholder="密码" />
              </div>
            </li>
            <li>
              <!-- <div id="captcha">
                <p id="wait">正在加载验证码...</p>
              </div> -->
            </li>
            <li style="text-align: right;" class="pr">
              <el-checkbox class="auto-login">记住密码</el-checkbox>
              <span style="text-align: left;padding-left:80px">
                <a href="javascript:;" class="register" @click="toRegister">注册 XMall 账号</a>
                <a style="padding: 1px 0 0 10px">忘记密码 ?</a>
              </span>
            </li>
          </ul>
          <!--登陆-->
          <div style="margin-top: 25px">
            <el-button
              style="margin: 10px 20px 0px 20px;width: 80%;height: 36px;font-size: 18px;line-height: 24px ;"
              :classStyle="ruleForm.userPwd&& ruleForm.userName&& logintxt === '登录'?'main-btn':'disabled-btn'"
              :text="logintxt"
              type="danger"
              @click="login"
            ></el-button>
          </div>
          <!--返回-->
          <div>
            <el-button
              text="返回"
              @click="login_back"
              style="margin: 10px 20px 0px 20px;width: 80%;height: 36px;font-size: 18px;line-height: 24px"
            >返回</el-button>
          </div>
          <div class="border"></div>
          <div class="footer">
            <div class="other">其它账号登录：</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setStore, getStore, removeStore } from "../../utils/storage.js";
export default {
  name: "Login",
  components:{
    
  },
  data() {
    return {
      cart: [],
      loginPage: true,
      ruleForm: {
        userName: "",
        userPwd: "",
        errMsg: ""
      },
      registered: {
        userName: "",
        userPwd: "",
        userPwd2: "",
        errMsg: ""
      },
      autoLogin: false,
      logintxt: "登录",
      statusKey: ""
    };
  },
  methods: {
    login_back() {
      this.$router.go(-1);
    },
    open(t, m) {
      this.$notify.info({
        title: t,
        message: m
      });
    },
    messageSuccess() {
      this.$message({
        message: "恭喜您，注册成功！赶紧登录体验吧",
        type: "success"
      });
    },
    message(m) {
      this.$message.error({
        message: m
      });
    },
    getRemembered() {
      var judge = getStore("remember");
      if (judge === "true") {
        this.autoLogin = true;
        this.ruleForm.userName = getStore("rusername");
        this.ruleForm.userPwd = getStore("rpassword");
      }
    },
    rememberPass() {
      if (this.autoLogin === true) {
        setStore("remember", "true");
        setStore("rusername", this.ruleForm.userName);
        setStore("rpassword", this.ruleForm.userPwd);
      } else {
        setStore("remember", "false");
        removeStore("rusername");
        removeStore("rpassword");
      }
    },
    toRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    // 登录返回按钮
    login_back() {
      this.$router.go(-1);
    },
    // 登陆时将本地的添加到用户购物车
    login_addCart() {
      let cartArr = [];
      let locaCart = JSON.parse(getStore("buyCart"));
      if (locaCart && locaCart.length) {
        locaCart.forEach(item => {
          cartArr.push({
            userId: getStore("userId"),
            productId: item.productId,
            productNum: item.productNum
          });
        });
      }
      this.cart = cartArr;
    },
    login() {
      this.logintxt = "登录中...";
      this.rememberPass();
      if (!this.ruleForm.userName || !this.ruleForm.userPwd) {
        // this.ruleForm.errMsg = '账号或者密码不能为空!'
        this.message("账号或者密码不能为空!");
        return false;
      }
      var result = captcha.getValidate();
      if (!result) {
        this.message("请完成验证");
        this.logintxt = "登录";
        return false;
      }
      var params = {
        userName: this.ruleForm.userName,
        userPwd: this.ruleForm.userPwd,
        challenge: result.geetest_challenge,
        validate: result.geetest_validate,
        seccode: result.geetest_seccode,
        statusKey: this.statusKey
      };
      userLogin(params).then(res => {
        if (res.result.state === 1) {
          setStore("token", res.result.token);
          setStore("userId", res.result.id);
          // 登录后添加当前缓存中的购物车
          if (this.cart.length) {
            for (var i = 0; i < this.cart.length; i++) {
              addCart(this.cart[i]).then(res => {
                if (res.success === true) {
                }
              });
            }
            removeStore("buyCart");
            this.$router.push({
              path: "/"
            });
          } else {
            this.$router.push({
              path: "/"
            });
          }
        } else {
          this.logintxt = "登录";
          this.message(res.result.message);
          captcha.reset();
          return false;
        }
      });
    },
    init_geetest() {
      geetest().then(res => {
        this.statusKey = res.statusKey;
        window.initGeetest(
          {
            gt: res.gt,
            challenge: res.challenge,
            new_captcha: res.new_captcha,
            offline: !res.success,
            product: "popup",
            width: "100%"
          },
          function(captchaObj) {
            captcha = captchaObj;
            captchaObj.appendTo("#captcha");
            captchaObj.onReady(function() {
              document.getElementById("wait").style.display = "none";
            });
          }
        );
      });
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
* {
  box-sizing: content-box;
}

.login {
  overflow-x: hidden;
  overflow-y: hidden;
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .wrapper {
    background: url(../../static/images/bg_9b9dcb65ff.png) repeat;
    background-size: 100%;
    min-height: 1000px;
    min-width: 630px;
  }
}

.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 20%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  .title {
    z-index: 0;
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    background-image: url(../../static/images/smartisan_4ada7fecea.png);
    background-size: 140px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 92px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    h4 {
      font-size: 2rem;
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .content {
    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

// @media screen and (min-width: 737px),
//   screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
//   .wrapper {
//     background: url(../../static/images/con-bg_04f25dbf8e.jpg) repeat-x;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//   }
//   .dialog {
//     background: url(../../static/images/dialog-gray-bg.png) #fff bottom repeat-x;
//     border-radius: 12px;
//     display: none;
//     margin: -163px 0 0 -218px;
//     width: 436px;
//     position: fixed;
//     left: 50%;
//     top: 50%;
//   }
//   .dialog .title h4 {
//     border-bottom: #d1d1d1 solid 1px;
//     box-shadow: 0 2px 6px #d1d1d1;
//     color: #666;
//     font-size: 20px;
//     height: 61px;
//     line-height: 61px;
//     padding: 0 0 0 35px;
//   }
//   .common-form li {
//     clear: both;
//     margin-bottom: 15px;
//     position: relative;
//   }
//   .auto-login {
//     position: absolute;
//     top: 0px;
//     left: 2px;
//     color: #999;
//   }
//   .register {
//     padding: 1px 10px 0;
//     border-right: 1px solid #ccc;
//   }
//   .border {
//     margin-top: 10px;
//     border-bottom: 1px solid #ccc;
//   }
//   .other {
//     margin: 20px 5px 0 0;
//     width: auto;
//     color: #bbb;
//     font-size: 12px;
//     cursor: default;
//     color: #999;
//   }
//   .footer {
//     display: flex;
//     flex-direction: row;
//   }
//   .agree {
//     margin-bottom: 30px;
//     color: #999;
//   }
// }

.registered {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>
