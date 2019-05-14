
import Vue from 'vue'
import { Util } from '../utils'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
    _: any,
    $: any,
    utils: Util,
    echarts: any,
    cookies: any,
    CKEDITOR: any
  }
}
