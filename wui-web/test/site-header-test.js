var jsdom = require("jsdom");
var expect = require('chai').expect;
var fs = require("fs");
var jquery = fs.readFileSync("node_modules/jquery/dist/jquery.min.js", "utf-8");

describe('test suite', function () {
  it('test case', function (done) {
    jsdom.env({
      html: '<div></div>',
      src: [jquery],
      done: function (err, win) {
        var $ = win.$;
        var SiteHeader = require('../src/site-header');

        SiteHeader.create({
          $el: $('div'),
          name: 'Cloud Mu',
          roles: 'Administrator'
        });

        window = {
          location: {
            href: ''
          }
        };

        WUI = {
          ajax: function() {
            var retDfd = new $.Deferred();

            retDfd.resolve({
              resetPasswordUrl: 'resetPasswordUrl',
              loginUrl: 'loginUrl'
            });

            return retDfd;
          }
        };

        $('#change-password').click();
        $('#logout').click();

        expect($('#user-name').text()).eql('Cloud Mu');
        expect($('#user-roles').text()).eql('Administrator');
        done();
      }
    })
  })
})