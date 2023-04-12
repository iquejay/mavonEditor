<template>
    <div class="container">
        <div id="editor">
            <mavon-editor
                style="height: 100%"
                v-model="code"
                :codeStyle="codeStyle"
                :xssOptions="xssOptions"
                :markdown-options="markdownOptions"
            />
        </div>
    </div>
</template>
<script>
const code = `java
/**
 * @author John Smith <john.smith@example.com>
*/
package l2f.gameserver.model;

public abstract strictfp class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}`;

module.exports = {
    name: 'editor',
    data: function () {
        return {
            codeStyle: "github",
            code: '<span style="color:red;font-size:36px;">A</span> \n```' + code + '\n```',
            xssOptions:{
                whiteList: {
                    span: ['style']
                }
            },
            markdownOptions: {
                theme: 'material-lighter',
                highlightCdn: 'https://i.epay.126.net/a/docs/shiki/'
            }
        };
    }
}
</script>
<style>
.container {
    margin: auto;
    width: 80%;
}
#editor {
    height: 580px;
}
.switch-code-style {
    margin-top: 10px;
    font-size: 16px;
}
</style>
