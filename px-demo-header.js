/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
    Relative paths assume component is being run from inside an app or another component, where dependencies are flat
    siblings. When this component is run from its own repo (e.g. tests, examples), we assume the server is started with
    'gulp serve' (or similar server setup) to enable correct finding of bower dependencies for local runs.
*/
/* Import style module */
/**
Creates a header for Predix UI demo pages.

##### Usage

    <px-demo-header
        module-name="px-calendar-picker"
        description="The px-calendar-picker component includes various elements used for structuring responsive layouts. This component allows the user to select a date or date range. The main use of this component is to be used in the px-range-panel.">
    </px-demo-header>

@element px-demo-header
@blurb Creates a header for Predix UI demo pages.
@homepage index.html
@demo index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-icon-set/px-icon-set-utility.js';
import 'px-icon-set/px-icon-set-navigation.js';
import 'px-icon-set/px-icon.js';
import './css/px-demo-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="px-demo-styles"></style>

    <section class="demo-background--base">
      <div class="demo-layout--center u-pv++ text--shadow">
        <div class="flex flex--row flex--wrap">
          <div class="flex__item flex__item__msfix u-mb">
            <h1 class="delta">{{moduleName}}</h1>
            <div class="demo-text-width--max">
              <p>{{description}}</p>
            </div>
            <template is="dom-if" if="{{!hideShields}}">
              <div class="flex u-mb demo-header__shield-badge-container">
                <img class="demo-header__badge-container__badge u-mr--" src="{{_getShieldUrl(_shieldName, githubOrg, 'Travis')}}" alt="Travis Status" onerror="this.style.display='none'" on-load="_shieldImgLoaded">
                <img class="demo-header__badge-container__badge u-mr--" src="{{_getShieldUrl(_shieldName, githubOrg, 'Bower')}}" alt="Bower Version" onerror="this.style.display='none'" on-load="_shieldImgLoaded">
                <img class="demo-header__badge-container__badge u-mr--" src="{{_getShieldUrl(_shieldName, githubOrg, 'GitHub')}}" alt="GitHub Issues Count" onerror="this.style.display='none'" on-load="_shieldImgLoaded">
              </div>
            </template>
            <div class="flex flex--row">
              <div class="flex flex--col flex--middle u-mr++">
                <template is="dom-if" if="{{mobile}}">
                  <span class="caps u-mb--">Mobile</span>
                  <px-icon title="Recommended for mobile" class="device-icon u-mr--" icon="px-utl:phone"></px-icon>
                </template>
                <template is="dom-if" if="{{!mobile}}">
                  <span class="caps u-mb-- muted">Mobile</span>
                  <px-icon title="Not recommended for mobile" class="device-icon u-mr-- muted" icon="px-utl:phone"></px-icon>
                </template>
              </div>
              <div class="flex flex--col flex--middle u-mr++">
                <template is="dom-if" if="{{tablet}}">
                  <span class="caps u-mb--">Tablet</span>
                  <px-icon title="Recommended for tablet" class="device-icon u-mr--" icon="px-utl:tablet"></px-icon>
                </template>
                <template is="dom-if" if="{{!tablet}}">
                  <span class="caps u-mb-- muted">Tablet</span>
                  <px-icon title="Not recommended for tablet" class="device-icon u-mr-- muted" icon="px-utl:tablet"></px-icon>
                </template>
              </div>
              <div class="flex flex--col flex--middle u-mr++">
                <template is="dom-if" if="{{desktop}}">
                  <span class="caps u-mb--">Desktop</span>
                  <px-icon title="Recommended for desktop" class="device-icon u-mr--" icon="px-utl:desktop-computer"></px-icon>
                </template>
                <template is="dom-if" if="{{!desktop}}">
                  <span class="caps u-mb-- muted">Desktop</span>
                  <px-icon title="Not recommended for desktop" class="device-icon u-mr-- muted" icon="px-utl:desktop-computer"></px-icon>
                </template>
              </div>
            </div>
          </div>
          <a class="actionable u-mt+" href="https://github.com/[[githubOrg]]/{{_shieldName}}" target="_blank" rel="noopener">
            <px-icon class="menu__open u-mr--" icon="px-nav:new-window"></px-icon>View on Github
          </a>
        </div>
      </div>
    </section>
`,

  is: 'px-demo-header',

  properties: {
    /**
     * Name of the Predix UI module.
     *
     * @property moduleName
     * @type {String}
     */
    moduleName: {
      type: String,
      value: ''
    },

    /**
     * Description of the Predix UI module.
     *
     * @property description
     * @type {String}
     */
    description: {
      type: String,
      value: ''
    },

    /**
     * Hides the shields (i.e. the images that show the current bower tag,
     * issues, and more). Useful if you don't need them or can't get them.
     *
     * @property hideShields
     * @type {Boolean}
     * @default false
     */
    hideShields: {
      type: Boolean,
      value: false
    },

    /**
     * Sets the name of the topmost parent component, which will be used to
     * build the shield links. Optional, leave it blank to use the `moduleName`.
     *
     * @property parentName
     * @type {String}
     */
    parentName: {
      type: String,
      value: ''
    },

    /**
     * The computed name for the shields. If `parentName` is defined and has
     * length, it takes precedence. Then `moduleName` is used by default.
     *
     * @property
     * @type {String}
     */
    _shieldName: {
      type: String,
      computed: '_computeShieldName(moduleName, parentName)'
    },
    /**
    * Whether the component is optimized for desktop.
    * @property desktop
    * @type {Boolean}
    * @default false
    */
    desktop: {
      type: Boolean,
      value: false
    },
    /**
    * Whether the component is optimized for tablet.
    * @property tablet
    * @type {Boolean}
    * @default false
    */
    tablet: {
      type: Boolean,
      value: false
    },
    /**
    * Whether the component is optimized for mobile.
    * @property mobile
    * @type {Boolean}
    * @default false
    */
    mobile: {
      type: Boolean,
      value: false
    },
    /**
     * Name of the Github organization this repo is hosted on. Defaults to
     * 'predixdesignsystem'.
     */
    githubOrg: {
      type: String,
      value: 'predixdesignsystem'
    }
  },

  /**
   * Computes the `_shieldName`. Tries to use the `parentName`, then falls
   * back to `moduleName`.
   *
   * @param {String} moduleName
   * @param {string} parentName
   * @return {String}
   */
  _computeShieldName: function (moduleName, parentName) {
    if (moduleName && (typeof moduleName === 'string')) {
      parentName = parentName || '';
      return (parentName.length) ? parentName : moduleName;
    }
  },

  _getShieldUrl: function (shield, org, service) {
    if (typeof shield === 'string') {
      if (service === 'Travis') {
        return 'https://img.shields.io/travis/' + org + '/' + shield + '/master.svg?style=flat-square';
      }
      else if (service === 'Bower') {
        return 'https://img.shields.io/github/tag/' + org + '/' + shield + '.svg?style=flat-square&label=bower';
      }
      else if (service === 'GitHub') {
        return 'https://img.shields.io/github/issues-raw/' + org + '/' + shield + '.svg?style=flat-square';
      }
    }
  },

  _shieldImgLoaded: function(evt){
    evt = dom(evt);
    this.toggleClass('demo-header__badge-container__badge--loaded', true, evt.localTarget);
  }
});