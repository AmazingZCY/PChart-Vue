<template>
  <div id="wrap">
    <div id="tit">
      <h1>PChat</h1>
    </div>
    <div id="message">
      <ul>
        <li id='messageList' v-for="(item , index) in messages" :key="index">
          <!-- <el-link v-show="index == num1" id="join" type="primary" disabled>{{loginUser}}加入聊天室</el-link> -->
          <h3>{{item.user}}</h3>
          <p>{{item.message}}</p>
          <!-- <el-link v-show="index == num" id="leave" type="danger" disabled>{{logoutUser}}已离开聊天室</el-link> -->
          
        </li>
      </ul>
    </div>
    <div id="users">
      <ul v-for="(item , index) in users" :key="index">
        <li>{{item}}</li>
      </ul>
    </div>
    <div id="input">
      <textarea name id="text" cols="30" rows="10" @keyup.enter="sendMsg"></textarea>
      <el-button type="danger" id="exit" @click="close">退出</el-button>
      <el-button id="send" @click="sendMsg" >发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      messages: [],
      users: [],
      logoutUser:'',
      loginUser:'',
      num:-1,
      num1 :-1
    };
  },
  mounted() {
        if(this.$store.state.user == ''){
        this.$router.push('/')
      }
    
  },
  
updated(){
        // 聊天定位到底部
          let ele = document.getElementById('message');
          ele.scrollTop = ele.scrollHeight;
      },
  sockets: {
    logined(data) {
      // console.log(data);
      this.users = data[0];
      this.messages = data[1];
      // if(this.messages.length==0){
      //   this.messages={user:'',message:''}
      // }
      this.num1 = this.messages.length;
      this.loginUser = data[2].user;
    },
    returnMsg(data) {
      // console.log(data);
      this.messages = data;
    },
    logout(data) {
      this.logoutUser = data[1].user;
      this.num = data[0].num - 1;
      this.users = this.users.splice(this.users.indexOf(this.logoutUser), 1);
    }
  },
  methods: {
    sendMsg() {
      var msg = document.getElementById("text").value.replace(/[\r\n]/g, "");
      if (msg == "") {
        this.openVn();
      } else {
        this.$socket.emit("sendMsg", {
          user: this.$store.state.user,
          message: msg
        });
        document.getElementById("text").value = "";
      }
    },
    openVn() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [
          h("span", null, "发送内容不能为空，请重新输入！ ")
        ])
      });
    },
    close() {
      if (
        navigator.userAgent.indexOf("Firefox") != -1 ||
        navigator.userAgent.indexOf("Chrome") != -1
      ) {
        window.location.href = "about:blank";
        window.close();
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    }
  }
};
</script>

<style scoped>
#wrap {
  width: 800px;
  height: 800px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -400px 0 0 -400px;
  border: 2px solid #409eff;
  border-radius: 5px;
}
#message {
  width: 600px;
  height: 600px;
  border-bottom: 2px solid #409eff;
  overflow-y: scroll;
  margin-top: 9px;
  font-size: 22px;
  /* padding-right: 200px; */
}
#users {
  width: 200px;
  height: 800px;
  border-left: 2px solid #409eff;
  position: absolute;
  right: 0;
  top: 0;
}
#tit {
  width: 800px;
  height: 50px;
  margin: -80px 0 0 0;
  text-align: center;
}
#input {
  width: 600px;
  height: 200px;
}
#send {
  position: absolute;
  bottom: 10px;
  right: 230px;
}
#exit {
  position: absolute;
  bottom: 10px;
  right: 310px;
}
#text {
  display: inline-block;
  width: 594px;
  height: 146px;
  border: 0 solid;
  outline: none;
  font-size: 28px;
  line-height: 30px;
  resize: none;
  overflow-y: hidden;
}
#leave{
  display: block;
  text-align: center;
  font-size: 22px;
}
ul{
  list-style: none;
}
</style>
