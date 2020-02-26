<template>
  <div>    
    <navbar/>
    <Content/>
  </div>
</template>

<script>
import Content from './content'
import navbar from './navbar'

export default {
  name: 'home-page-screen-dashboard',
  components: {
    Content,
    navbar
  },
}
</script>

<style>
    .header-bottom-homepage {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 85%;
        z-index: -1;
    }
</style>