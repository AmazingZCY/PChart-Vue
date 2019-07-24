<template>
  <div id="wrap">
    <div v-show="!isSigin" id="log">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="uid">
    <el-input v-model.number="ruleForm.uid"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login" id="login">登录</el-button>
    <el-button @click="gotoSigin"  id="sigin">注册</el-button>
  </el-form-item>
</el-form>
    <!-- <div><h1>PChat</h1></div>
    <div><label class="tit">账号：</label><div class="text"><el-input v-model="uid" placeholder="请输入账号"></el-input></div></div>
    <div><label class="tit">密码：</label><div class="text"><el-input v-model="password" placeholder="请输入密码" show-password></el-input></div></div>
    <div><el-button type="primary" id="login" @click="login">登录</el-button><el-button type="primary" id="sigin" @click="gotoSigin">注册</el-button></div> -->
    </div>
    <div v-show="isSigin" id="sig">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="uid">
    <el-input v-model.number="ruleForm.uid"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="gotoLogin"  id="login">登录</el-button>
    <el-button @click="sigin"  id="sigin">注册</el-button>
  </el-form-item>
</el-form>
      <!-- <div><h1>PChat</h1></div>
    <div><label class="tit">账号：</label><div class="text"><el-input v-model="uid" placeholder="请输入账号"></el-input></div></div>
    <div><label class="tit">密码：</label><div class="text"><el-input v-model="password" placeholder="请输入密码" show-password></el-input></div></div>
    <div><label class="tit">确认密码：</label><div class="text"><el-input v-model="password0" placeholder="请再次输入密码" show-password></el-input></div></div>
    <div><el-button type="primary" id="login" @click="gotoLogin">登录</el-button><el-button type="primary" id="sigin" @click="sigin">注册</el-button></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'sigin',
  data () {
    // return {
    //   uid:'',
    //   password:'',
    //   password0:'',
    //   isSigin: false
    // }
     var checkUid = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        };
        if(value.length>12){
          return callback(new Error('账号长度过长！'))
        }

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          uid: '',
        },
        isSigin: false,
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          uid: [
            { validator: checkUid, trigger: 'blur' }
          ]
        }
      };
  },

  methods: {
          login () {
            var _this = this
          this.ajax({
              method:'get',
              url:'http://localhost:3030/login?uid='+this.ruleForm.uid+'&password='+this.ruleForm.pass
          }).then(function(res){
            console.log(res)
              if(res.data.code == 202){
                console.log(res.data.code)
                _this.$socket.emit('login',_this.ruleForm.uid)
                _this.$store.state.user = _this.ruleForm.uid
                _this.ruleForm.uid = '';
                _this.ruleForm.pass = '';
                _this.ruleForm.checkPass = '';
              }else if(res.data.code == 302){
                _this.postMsg(res.data.Msg)
              }else {
                _this.postMsg('网络出错，请稍后再试！')
              }
          }).catch(function(err){
            console.log(err)
          })
      },
      sigin () {
        var _this = this
          this.ajax({
              method:'get',
              url:'http://localhost:3030/sigin?uid='+this.ruleForm.uid+'&password='+this.ruleForm.pass
          }).then(function(res){
              if(res.data.code == 201){
                _this.postMsg(res.data.Msg);
                _this.ruleForm.uid = '';
                _this.ruleForm.pass = '';
                _this.ruleForm.checkPass = '';
                _this.isSigin = false;
              }else if(res.data.code == 301){
                _this.postMsg(res.data.Msg);
              }else{
                _this.postMsg('网络出错，请稍后再试！')
              }
          }).catch(function(err){
            console.log(err)
          })
      },
      gotoSigin () {
        this.ruleForm.uid = '';
        this.ruleForm.pass = '';
                
        this.isSigin = true;
      },
      gotoLogin () {
        this.ruleForm.uid = '';
        this.ruleForm.pass = '';
        this.ruleForm.checkPass = '';
        this.isSigin = false;
      },
      postMsg(msg) {
        this.$alert(msg, 'PChat', {
          confirmButtonText: '确定',
        });
      },
      message(msg) {
        this.$message({
          message: msg,
          type: 'warning'
        });
      }

},
  sockets: {
    loginFail () {
      this.postMsg('账号已登录！')
    },
    loginSuccess () {
      this.$router.push('/Chat')
    }
  },
}
</script>
<style scoped>
    #wrap{
        width: 400px;
        height: 300px;
        position: absolute;
        left: 50%;
        top: 40%;
        margin: -177px 0 0 -225px;
        border: 2px solid #409eff;
        border-radius: 5px;
        padding: 50px 50px 0 0;
    }
    h1{
      width: 100px;
      height: 50px;
      text-align: center;
      margin: 0 auto;
    }
    .tit{
      width: 80px;
      height: 50px;
      display: inline-block;
      margin-left: 20px;
    }
    .text{
      width: 380px;
      height: 50px;
      display: inline-block;
    }
    #login,#sigin{
      font-size: 18px;
      /* position: absolute;
      bottom: -100px;
      left: 50%; */
      width: 100px;
      height: 50px;
    }

    #sigin{
      margin-left: 50px;
    }
</style>
