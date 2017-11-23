import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/Content'
import Series from '@/components/Series'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/series',
      name: 'Series',
      component: Series
    }
  ]
})
