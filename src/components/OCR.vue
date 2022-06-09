<script setup>
defineProps({
  msg: String,
});
</script>

<template>
  <div class="pure-menu pure-menu-horizontal">
    <a href="#" class="pure-menu-heading pure-menu-link">Simple OCR</a>

    <span>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a @click="reset" href="#" class="pure-menu-link"
            >refresh<i class="fa-solid fa-rotate"></i
          ></a>
        </li>
        <li class="pure-menu-item">
          <a @click="save" href="#" class="pure-menu-link">save</a>
        </li>
        <li class="pure-menu-item">
          <a @click="drive" href="#" class="pure-menu-link">file_upload</a>
        </li>
      </ul>
    </span>
  </div>
  <div id="inspire">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Simple OCR</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="isSuccess || isFailed">
        <v-btn icon @click="reset">
          <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn icon @click="save">
          <v-icon>save</v-icon>
        </v-btn>
        <v-btn icon @click="drive">
          <v-icon>file_upload</v-icon>
        </v-btn></span
      >
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <div class="container" v-if="isInitial">
            <form enctype="multipart/form-data" novalidate>
              <h1>Upload image</h1>
              <div class="dropbox">
                <input
                  type="file"
                  :name="'document'"
                  :disabled="isSaving"
                  @change="filesChange($event.target.files)"
                  accept="image/*"
                  class="input-file"
                />
                <p v-if="isInitial">
                  Drag your file here to begin<br />
                  or click to browse
                </p>
              </div>
            </form>
          </div>
          <div class="container text-xs-center" v-if="isSaving">
            <v-progress-circular
              v-bind:size="200"
              v-bind:width="15"
              v-bind:rotate="-90"
              v-bind:value="status.progress * 100"
              color="primary"
            >
              {{ progress }}
            </v-progress-circular>
            <h2>{{ status.status }}</h2>
          </div>
          <v-layout row wrap v-if="isSuccess || isFailed">
            <v-flex xs12>
              <v-divider></v-divider>
              <v-text-field
                label="Result"
                v-model="status.text"
                counter
                full-width
                multi-line
                single-line
                :auto-grow="true"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2022 - Alan Killian &lt;@akillian&gt;</span>
    </v-footer>
  </div>
</template>

<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: transparent;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgba(
    255,
    255,
    255,
    0.1
  ); /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
