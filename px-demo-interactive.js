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
Component container code for Predix UI demos.

##### Usage

    <px-demo-interactive>
    </px-demo-interactive>

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

import './css/px-demo-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="px-demo-styles"></style>

    <!-- If a code editor instance was given, it will go outside everything
         because it appears as an overlay. -->
    <slot name="px-demo-code-editor"></slot>

    <section class="demo-background--interactive">
      <!-- Tabs go above -->
      <div class="demo-configs-container [ u-ph++ u-pt++ ]">
        <slot name="px-demo-configs"></slot>
      </div>

      <!-- Wraps around all interactive -->
      <article class="demo-container-flex [ u-ph++ u-pb++ ]">

        <!-- The demo properties go in here -->
        <div class="demo-properties-container">
          <div id="propsContainer" class="demo-properties">
            <slot name="px-demo-props"></slot>
          </div>
        </div>

        <!-- The demo component and snippet go in here -->
        <div class="demo-component-code-container flex__item flex__item--msfix u-mt+">
          <div class=" demo-component-container u-p++">
            <slot name="px-demo-component"></slot>
          </div>

          <slot name="px-demo-component-snippet"></slot>
        </div>

      </article>
    </section>
`,

  is: 'px-demo-interactive',

  properties: {
    /**
     * If true, make sure the props container is shown. If false, hide it.
     *
     * @type {Object}
     */
    propsShouldBeVisible: {
      type: Boolean,
      value: true,
      readOnly: true
    }
  },

  listeners: {
    'px-demo-props-some-visible' : '_ensurePropsContainerVisible',
    'px-demo-props-none-visible' : '_ensurePropsContainerHidden'
  },

  /**
   * When the `px-demo-props` component notifies that some props are visible,
   * make sure the properties container is visible.
   */
  _ensurePropsContainerVisible: function() {
    var propsContainer = this.$.propsContainer;
    if (propsContainer && propsContainer.classList.contains('visuallyhidden')) {
      propsContainer.classList.remove('visuallyhidden');
    }
  },

  /**
   * When the `px-demo-props` component notifies that no props are visible,
   * make sure the properties container is hidden.
   */
  _ensurePropsContainerHidden: function() {
    var propsContainer = this.$.propsContainer;
    if (propsContainer && !propsContainer.classList.contains('visuallyhidden')) {
      propsContainer.classList.add('visuallyhidden');
    }
  },

  attached: function() {
    //find the content tag associated with demo-component
    var demoComponentContent = dom(this.root).querySelector('content[select=px-demo-component]');
    // and observe it, to find out when the light dom is loaded - once it's loaded, call the function that fires off a loaded event, making sure to bind the polymer component.
    dom(demoComponentContent).observeNodes(this._demoComponentLightDomLoaded.bind(this));
  },

  /**
   * gets called when the light dom for demo-component is loaded, and fires
   * an event.
   */
  _demoComponentLightDomLoaded: function() {
    this.fire('px-demo-component-light-dom-loaded');
  }
  /**
   * fired when the light DOM content has been loaded for px-demo-component, which
   * holds the component being demoed.
   * @event px-demo-component-light-dom-loaded
   */
});
