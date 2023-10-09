
import Vue from 'vue'
// Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/zh_cn'
// Import third party plugins
import 'froala-editor/js/third_party/embedly.min'
import 'froala-editor/js/third_party/font_awesome.min'
import 'froala-editor/js/third_party/image_tui.min'
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
import { uploadUrl, uploadHeaders } from '@/data/options'
// config
Vue.use(VueFroala)

const maxUploadSize = process.env.VUE_APP_MAX_UPLOAD_SIZE * 1024 * 1024

export const options = {
  heightMin: 280,
  zIndex: 2022,
  spellcheck: false,
  placeholderText: '请输入内容',
  key: 'Lc2C1qB2F1A3H4I3A14hBd1a1c1Zd1IXBc1a1THTBPLIIWBORpI1A1A1D7A1F6G4A1H4C2==',
  language: 'zh_cn',
  toolbarButtons: {
    moreText: {
      // List of buttons used in the  group.
      buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],

      // Alignment of the group in the toolbar.
      align: 'left',

      // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
      buttonsVisible: 3
    },

    moreParagraph: {
      buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
      align: 'left',
      buttonsVisible: 3
    },

    moreRich: {
      buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
      align: 'left',
      buttonsVisible: 3
    },

    moreMisc: {
      buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'selectAll', 'html', 'help'],
      align: 'right',
      buttonsVisible: 2
    }
  },
  fileUploadURL: uploadUrl,
  fileMaxSize: maxUploadSize,
  imageUploadURL: uploadUrl,
  imageMaxSize: maxUploadSize,
  imageInsertButtons: [
    'imageBack', '|', 'imageUpload', 'imageByURL'
  ],
  videoUploadURL: uploadUrl,
  videoMaxSize: process.env.VUE_APP_MAX_UPLOAD_SIZE * 1024 * 1024,
  videoInsertButtons: [
    'videoBack', '|', 'videoUpload', 'videoEmbed'
  ],
  requestHeaders: uploadHeaders,
  attribution: false // Powered by
}
