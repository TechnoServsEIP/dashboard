<template>
  <q-card class="my-card bg-grey-1" flat bordered>
    <div class="row">
      <div class="col-5">
        <q-avatar
          square
          size="100px"
          font-size="82px"
          color="primary"
          text-color="white"
          icon="directions"
        />
      </div>

      <div class="col-5">
        <p class="textUser">User Name</p>
        <p class="textMail">Email</p>
      </div>

      <div class="col-2">
        <q-btn color="grey" flat round dense icon="edit" />
      </div>
    </div>
  </q-card>
</template>

<style lang="scss" scoped>
.textUser {
  font-size: large;
  font-weight: bold;
}
.textMail {
  margin-left: 1px;
  font-size: medium;
}
</style>
