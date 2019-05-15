import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {

  public created (): void {
    // if (!this.cookies.get('user_data')) {
    //   if (this.$route.name !== 'login') {
    //     this.$router.push({
    //       name: 'login'
    //     })
    //   }
    // }
  }
}
