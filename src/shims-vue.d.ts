declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.mp3' {
  const content: any;
  export default content;
}

declare module 'vue2-circle-progress';
