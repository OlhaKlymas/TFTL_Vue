<template>
  <div class="main-layout">
    <TheHeader/>
    <main>
      <router-view/>
    </main>
    <TheFooter/>
  </div>
</template>

<script>

import TheHeader from "@/components/app/TheHeader";
import TheFooter from "@/components/app/TheFooter";
export default {
  name: 'MainLayout',
  components: {TheFooter, TheHeader}
}
</script>
