/**
 * Hexo tag for generating a DogePlayer audio player.
 * Usage: {% dogeplayer userId vcode %}
 */

hexo.extend.tag.register("dogeplayer", function (args) {
  var userId = args[0];
  var vcode = args[1];
  var divId = "player_" + vcode;

  var html =
    '<div id="' +
    divId +
    '"></div>\n' +
    '<script type="text/javascript" data-pjax src="https://player.dogecloud.com/js/loader"></script>\n' +
    '<script type="text/javascript" data-pjax defer>\n' +
    "  setTimeout(() => {\n" +
    "    var dogePlayer = new DogePlayer({\n" +
    '        container: document.getElementById("' +
    divId +
    '"),\n' +
    "        userId: " +
    userId +
    ",\n" +
    '        vcode: "' +
    vcode +
    '",\n' +
    "        autoPlay: false\n" +
    "    });\n" +
    "  }, 300);\n" +
    "</script>\n";

  return html;
});
