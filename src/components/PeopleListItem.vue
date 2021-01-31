<template>
  <li class="people-list__item">
    <div class="people-list__item-img">
      <img :src="require(`@/assets/images/people/${imgUrl}`)"
           :alt="item.name"
      >
    </div>
    <div class="people-list__item-content">
      <div class="people-list__item-birth-year">
        {{item.birth_year}}
      </div>
      <div class="people-list__item-name">
        {{item.name}}
      </div>
      <ul class="people-list__item-details">
        <li class="people-list__item-eye-color">
          Eye color: {{item.eye_color}}
        </li>
        <li class="people-list__item-height">
          Height: {{item.height}}
        </li>
        <li class="people-list__item-mass">
          Mass: {{item.mass}}
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: "PeopleListItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    }
  }
}
</script>