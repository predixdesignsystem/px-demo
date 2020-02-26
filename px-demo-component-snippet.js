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
Wraps around `px-demo-snippet` to show code sample.

##### Usage

    <px-demo-component-snippet></px-demo-component-snippet>

@element px-demo-component-snippet
@blurb Wraps around `px-demo-snippet` to show code sample.
@homepage index.html
@demo index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo-snippet/px-demo-snippet.js';
import './css/px-demo-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="px-demo-styles"></style>

    <px-demo-snippet element-properties="{{_shallowProps}}" element-name="{{elementName}}" links-includes="[[linksIncludes]]" scripts-includes="[[scriptsIncludes]]" polygit-includes="[[polygitIncludes]]" code-link="[[codepenLink]]" suppress-property-values="[[suppressPropertyValues]]" no-indentation="[[noIndentation]]" hide-codepen="[[hideCodepen]]">
    </px-demo-snippet>
`,

  is: 'px-demo-component-snippet',

  properties: {
    /**
     * Name of the Predix UI element.
     *
     * @property elementName
     */
    elementName: {
      type: String,
      value: ''
    },

    /**
     * Description of the Predix UI module.
     *
     * @property elementProperties
     */
    elementProperties: {
      type: Object,
      value: function(){ return {}; }
    },

    /**
     * An array of <link> include URLs required to make the CodePen work.
     *
     * @property linksIncludes
     */
    linksIncludes: {
      type: Array,
      value: function(){ return {}; }
    },

    /**
     * An array of <script> include URLs required to make the CodePen work.
     *
     * @property scriptsIncludes
     */
    scriptsIncludes: {
      type: Array,
      value: function(){ return {}; }
    },

    /**
     * An array of additional PolyGit includes required to make the CodePen work.
     *
     * @property polygitIncludes
     */
    polygitIncludes: {
      type: Array,
      value: function(){ return {}; }
    },

    /**
     * Link to a pre-created Codepen that we do not need to dynamically build.
     *
     * @property codepenLink
     */
    codepenLink: {
      type: String
    },

    /**
     * Props computed to the format `px-demo-snippet` accepts.
     *
     * @property _shallowProps
     */
    _shallowProps: {
      type: Object,
      value: function(){ return {}; }
    },

    suppressPropertyValues: {
      type: Array,
      value: function() { return []; }
    },

    noIndentation: {
      type: Boolean,
      value: false
    },
    hideCodepen: {
      type: Boolean,
      value: false
    }
  },

  observers: ['_assignShallowProps(elementProperties, elementProperties.*)'],

  /**
   * Converts the complex `props` object into a shallow format of
   * `propName`:`propValue` for `px-demo-snippet`.
   *
   * @return {Object}
   */
  _assignShallowProps: function(props) {
    if (props && (typeof props === 'object') && Object.keys(props).length) {
      var propKeys = Object.keys(props);
      var shallow = {};

      for (var i = 0; i < propKeys.length; i++) {
        // Don't check the property directly because it might be a boolean value, check its existence on the object
        var val = props[propKeys[i]].hasOwnProperty('value') ? props[propKeys[i]].value : "";
        // @TODO: px-demo-snippet silently fails if it gets a string for an attribute with double quotes.
        // For now, we clean them out manually. Future improvement is to fix this bug in px-demo-snippet.
        if (typeof val === 'string') {
          // Replace double quotes on the outside with single quotes. Example:
          // In: <tag foo="bar" array="['key':'val']"></tag>
          // Out: <tag foo='bar' array='["key":"val"]'></tag>
          val = val.replace(/([a-zA-Z]+=)"([^"]*)"/g, function(fullMatch, attrName, attrVal) {
            return attrName + "'" + attrVal.replace(/\'/g, '"') + "'";
          });
        }
        shallow[propKeys[i]] = val;
      }

      this.set('_shallowProps', {});
      this.set('_shallowProps', shallow);
    }
  }
});