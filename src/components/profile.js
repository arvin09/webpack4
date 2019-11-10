import Vue from "vue";

export default Vue.component("Profile", {
    data: () => ({
      name: 'Arvin'
    }), 
    template: `
    <div class="profile">
      <img src="./images/profile.jpg" alt />
      <h1>Hey, {{name}}</h1>
    </div>
    `
})