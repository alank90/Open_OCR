<script setup>
import { ref } from "vue";

const value = ref(50);
let isSuccess = ref(true);
let isFailed = ref(false);
let isInitial = ref(true);
</script>

<template>
  <div class="pure-menu pure-menu-horizontal">
    <a href="#" class="pure-menu-heading pure-menu-link">Simple OCR</a>

    <span v-if="isSuccess || isFailed" class="menu-bar">
      <ul class="pure-menu-list menu-bar-list">
        <li class="pure-menu-item">
          <a @click="reset" href="#" class="pure-menu-link tooltip"
            ><i class="fa-solid fa-rotate"></i
            ><span class="tooltiptext">refresh</span></a
          >
        </li>
        <li class="pure-menu-item">
          <a @click="save" href="#" class="pure-menu-link tooltip"
            ><i class="fa-solid fa-floppy-disk"></i
            ><span class="tooltiptext">save</span></a
          >
        </li>
        <li class="pure-menu-item">
          <a @click="drive" href="#" class="pure-menu-link tooltip"
            ><i class="fa-solid fa-upload"></i
            ><span class="tooltiptext">file_upload</span></a
          >
        </li>
      </ul>
    </span>
  </div>
  <!-- ========== End menu bar ================ -->

  <img alt="OCR logo" src="../assets/img/ocr_logo.jpg" />

  <!-- ========= Main Content ==========================  -->
  <div class="pure-g">
    <div v-if="isInitial" class="pure-u-3-5 container">
      <form enctype="multipart/form-data" novalidate>
        <h1>Uploadimage</h1>
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
    <div v-if="isSaving" class="container"></div>
  </div>

  <!-- ========= End Main content ======================  -->

  <!-- ==== Progress Bar =========== -->
  <ve-progress :progress="value" />

  <!-- <div id="inspire">
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
  </div> -->
</template>

<style scoped>
.pure-menu-horizontal {
  display: flex; /* flexbox for main menu */
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: -50px;
}

a.pure-menu-link {
  flex-grow: 0.1;
}

.menu-bar {
  flex-grow: 0.3;
}

.menu-bar .pure-menu-list.menu-bar-list {
  display: flex; /* flexbox for the menu list */
  flex-wrap: nowrap;
  justify-content: space-around;
}

.container {
  margin: 0 auto;
}

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
  font-size: 0.9rem;
  text-align: center;
  padding: 50px 0;
}

/* ========== Tool tip stylings ============ */
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  top: 100%;
  left: 50%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
}

/* Create arrow */
.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  bottom: 100%; /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
