<template>
  <div id="wrap">
    <div v-show="!isSigin" id="log">
    <div><h1>PChat</h1></div>
    <div><label class="tit">账号：</label><div class="text"><el-input v-model="uid" placeholder="请输入账号"></el-input></div></div>
    <div><label class="tit">密码：</label><div class="text"><el-input v-model="password" placeholder="请输入密码" show-password></el-input></div></div>
    <div><el-button type="primary" id="login" @click="login">登录</el-button><el-button type="primary" id="sigin" @click="gotoSigin">注册</el-button></div>
    </div>
    <div v-show="isSigin" id="sig">
      <div><h1>PChat</h1></div>
    <div><label class="tit">账号：</label><div class="text"><el-input v-model="uid" placeholder="请输入账号"></el-input></div></div>
    <div><label class="tit">密码：</label><div class="text"><el-input v-model="password" placeholder="请输入密码" show-password></el-input></div></div>
    <div><label class="tit">确认密码：</label><div class="text"><el-input v-model="password0" placeholder="请再次输入密码" show-password></el-input></div></div>
    <div><el-button type="primary" id="login" @click="gotoLogin">登录</el-button><el-button type="primary" id="sigin" @click="sigin">注册</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sigin',
  data () {
    return {
      uid:'',
      password:'',
      password0:'',
      isSigin: false
    }
  },

  methods: {
          login () {
            var _this = this
          if(this.uid==""){
              this.message('账号未输入！');
              return
          }
          if(this.password==""){
              this.message('密码未输入！');
              return
          }
          this.ajax({
              method:'get',
              url:'http://localhost:3030/login?uid='+this.uid+'&password='+this.password
          }).then(function(res){
            console.log(res)
              if(res.data.code == 202){
                console.log(res.data.code)
                _this.$socket.emit('login',_this.uid)
                _this.$store.state.user = _this.uid
                _this.uid = '';
                _this.password = '';
                _this.password0 = '';
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
          if(this.uid==""){
              this.message('账号未输入！');
              return
          }
          if(this.password==""){
              this.message('密码未输入！');
              return
          }
          if(this.password0==""){
              this.message('密码未再次输入！');
              return
          }
          if(this.password !==this.password0){
              this.message('两次输入的密码不一致！');
              this.password0 = ''
              return
          }
          this.ajax({
              method:'get',
              url:'http://localhost:3030/sigin?uid='+this.uid+'&password='+this.password
          }).then(function(res){
              if(res.data.code == 201){
                _this.postMsg(res.data.Msg);
                _this.uid = '';
                _this.password = '';
                _this.password0 = '';
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
        this.uid = '';
        this.password = '';
                
        this.isSigin = true;
      },
      gotoLogin () {
        this.uid = '';
        this.password = '';
        this.password0 = '';
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
        width: 500px;
        height: 300px;
        position: absolute;
        left: 50%;
        top: 40%;
        margin: -150px 0 0 -250px;
        border: 2px solid #409eff;
        border-radius: 5px;
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
      font-size: 28px;
      position: absolute;
      bottom: 30px;
      left: 50%;
      width: 100px;
      height: 50px;
    }
    #login{
      margin-left: -150px;
    }
    #sigin{
      margin-left: 50px;
    }
</style>
