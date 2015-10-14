angular.module('app', [])
  .controller('MainCtrl', function() {
    var _this = this;
    _this.result = '';

    var palettes = [{
      name: 'Primary',
      color: {
        normal: '@color/mdColor_cyan',
        dark: '@color/mdColor_cyan_dark',
        light: '@color/mdColor_cyan_light'
      },
      textColor: {
        normal: 'light',
        dark: 'dark',
        light: 'light'
      }
    }, {
      name: 'Accent',
      color: {
        normal: '@color/mdColor_pink',
        dark: '@color/mdColor_pink_dark',
        light: '@color/mdColor_pink_light'
      },
      textColor: {
        normal: 'dark',
        dark: 'dark',
        light: 'light'
      }
    }, {
      name: 'Warn',
      color: {
        normal: '@color/mdColor_red',
        dark: '@color/mdColor_red_dark',
        light: '@color/mdColor_red_light'
      },
      textColor: {
        normal: 'dark',
        dark: 'dark',
        light: 'light'
      }
    }, {
      name: 'Background',
      color: {
        normal: '@color/mdColor_background_light',
        dark: '@color/mdColor_background_light',
        light: '@color/mdColor_background_light'
      },
      textColor: {
        normal: 'light',
        dark: 'light',
        light: 'light'
      }
    }];

    // var palettes = [{
    //   name: 'Primary',
    //   color: {
    //     normal: '@color/mdColor_purple',
    //     dark: '@color/mdColor_purple_dark',
    //     light: '@color/mdColor_purple_light'
    //   },
    //   textColor: {
    //     normal: 'dark',
    //     dark: 'dark',
    //     light: 'light'
    //   }
    // }, {
    //   name: 'Accent',
    //   color: {
    //     normal: '@color/mdColor_teal',
    //     dark: '@color/mdColor_teal_dark',
    //     light: '@color/mdColor_teal_light'
    //   },
    //   textColor: {
    //     normal: 'dark',
    //     dark: 'dark',
    //     light: 'light'
    //   }
    // }, {
    //   name: 'Warn',
    //   color: {
    //     normal: '@color/mdColor_red',
    //     dark: '@color/mdColor_red_dark',
    //     light: '@color/mdColor_red_light'
    //   },
    //   textColor: {
    //     normal: 'dark',
    //     dark: 'dark',
    //     light: 'light'
    //   }
    // }, {
    //   name: 'Background',
    //   color: {
    //     normal: '@color/mdColor_background_dark',
    //     dark: '@color/mdColor_background_dark',
    //     light: '@color/mdColor_background_dark'
    //   },
    //   textColor: {
    //     normal: 'dark',
    //     dark: 'dark',
    //     light: 'dark'
    //   }
    // }];

    var templates = {
      color: {
        normal: '<item name="mdColor_<%= name.toLowerCase() %>Palette"><%= value %></item>',
        dark: '<item name="mdColor_<%= name.toLowerCase() %>Palette_dark"><%= value %></item>',
        light: '<item name="mdColor_<%= name.toLowerCase() %>Palette_light"><%= value %></item>'
      },
      textColor: {
        normal: '<item name="md<%= textName %><%= isInverse ? "Inverse" : "" %>_<%= name.toLowerCase() %>Palette">@color/md<%= textName %>_<%= type %></item>',
        dark: '<item name="md<%= textName %><%= isInverse ? "Inverse" : "" %>_<%= name.toLowerCase() %>Palette_dark">@color/md<%= textName %>_<%= type %></item>',
        light: '<item name="md<%= textName %><%= isInverse ? "Inverse" : "" %>_<%= name.toLowerCase() %>Palette_light">@color/md<%= textName %>_<%= type %></item>'
      }
    };

    // color
    _.each(palettes, function(palette) {
      _.each(palette.color, function(value, key) {
        _this.result += _.template(templates.color[key])({
          name: palette.name,
          value: value
        });
        _this.result += '\n'
      });
      _this.result += '\n'
    });

    // textColor
    _.each(palettes, function(palette) {
      _this.result += _.template('<!-- textColor for <%= name.toLowerCase() %> palette -->')({
        name: palette.name
      });
      _this.result += '\n';
      _.each(['TextColorPrimary', 'TextColorSecondary', 'TextColorHint', 'ColorDivider'], function(textName) {
        _.each(palette.textColor, function(value, key) {
          _this.result += _.template(templates.textColor[key])({
            textName: textName,
            name: palette.name,
            type: value,
            isInverse: false
          });
          _this.result += '\n';
        });
      });
      _this.result += '\n';

      _.each(['TextColorPrimary', 'TextColorSecondary', 'TextColorHint', 'ColorDivider'], function(textName) {
        _.each(palette.textColor, function(value, key) {
          _this.result += _.template(templates.textColor[key])({
            textName: textName,
            name: palette.name,
            type: value === 'light' ? 'dark' : 'light',
            isInverse: true
          });
          _this.result += '\n';
        });
      });
      _this.result += '\n';
    });

  });

