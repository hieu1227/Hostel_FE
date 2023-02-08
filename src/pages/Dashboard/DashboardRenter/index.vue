<template>
  <div id="header-dashboard">
    <div class="header-userName">
        <h2>Hi, {{name}}!</h2>
        <p>Email : {{email}}</p>
        <p>Role : {{role}}</p>
    </div>
        <div class="header-img">
            <img alt="Vue logo" src="@/assets/images/wellcome.png">
        </div>
  </div>
</template>

<script>
import { getToken } from '@/const/cookie';
export default {
  data(){
    return{
      
    }
  },
  computed: {
      name(){
        const name = getToken('username')
        return name;
      },
			email() {
				const email = getToken('email');
				return email;
			},
			role(){
				const id = getToken('roles');
				return id;
			}
	},
}
</script>

<style scoped>
#header-dashboard{
    height: 150px;
    width: 600px;
    margin: 100px 0px 0px 350px;
    display: flex;
    padding: 10px;
    border: 1px solid orange;
    border-radius: 5px;
    justify-content: space-between;
    align-items: center;
}
.header-img img{
  height: 100px ;
  width: 200px ;
}
</style>