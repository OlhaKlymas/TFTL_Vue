<template>
  <header class="header">
    <div class="header__wrap">
      <div class="header__logo">
        <img src="@/assets/images/StarWars.svg" alt="logo">
      </div>
      <div class="header__nav">
        <div class="header__nav-lang arrow">
          En
        </div>
        <div class="header__nav-log-in">
          <a href="#">Log in</a>
        </div>
        <div class="header__nav-sing-up">
          <a href="#">Sing up</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>