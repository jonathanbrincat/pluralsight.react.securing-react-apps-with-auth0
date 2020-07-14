/*eslint-disable */

import Vue from "vue";

import "./index.css";

Vue.config.productionTip = false;

const storeItemSubscribers = {};

const getItem = window.localStorage.getItem;
localStorage.getItem = (key, target) => {
  console.info(`Getting ${key}`);
  
  if(!storeItemSubscribers[key]) storeItemSubscribers[key] = [];
  if(target) storeItemSubscribers[key].push(target);
  
  // Call the original function 
  return getItem.call(localStorage, key);
  //return window.localStorage.getItem.call(localStorage, key);
};

const setItem = window.localStorage.setItem;
localStorage.setItem = (key, value) => {
  console.info(`Setting ${key} ${value}`);
  
  // Update the value in the dependent Vue instances
  if (storeItemSubscribers[key]) {
    storeItemSubscribers[key].forEach((dep, i) => {
      if (dep.hasOwnProperty(key)) dep[key] = value;
    });
  }
  
  // Call the original function
  setItem.call(localStorage, key, value);
};

setInterval(() => {
  const counter = localStorage.getItem("counter");
  localStorage.setItem("counter", +counter + 1);
}, 1000);

new Vue({  
  data: function() {
    return {
      counter: localStorage.getItem("counter", this) // We need to pass 'this' for now
    }
  },
  
  computed: {
    even() {
      return this.counter % 2 == 0;
    }
  },

  template: `<div>
    <div>Counter: {{ counter }}</div>
    <div>Counter is {{ even ? 'even' : 'odd' }}</div>
  </div>`
}).$mount("#app");
