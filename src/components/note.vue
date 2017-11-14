<template>
  <div id="note">
    <aside>
      <el-popover
        ref="noteBook"
        placement="bottom"
        width="200"
        trigger="click"
        v-model="noteBookPopover">
        <slot>
          <input type="text" placeholder="添加笔记本" style="width:130px;" v-model="newNoteBook">
          <span class='sure-btn' @click="addNoteBook()">确定</span>
          <span class='cancel-btn' @click="cancelAddNoteBook()">取消</span>
        </slot>
      </el-popover>
      <header>
        记 事 本
        <span class="add-note" v-popover:noteBook>+</span>
      </header>
      <div class="notes">
        <el-tree
          ref="tree"
          :data="noteData"
          node-key="id"
          :expand-on-click-node="false"
          :render-content="renderContent"
          @node-click="nodeClick"
          style="border:none"
        >
        </el-tree>
      </div>
    </aside>

    <section style="margin-left:.5rem;">
      <header>
        <el-button v-if="editNoteItem && editNoteItem.code.length === 6" type="primary" size="mini" icon="edit" title="编辑" style="background-color:#99A9BF;border:none;position:absolute;right:2rem;top:.6rem;" @click= toggleStatus></el-button>
      </header>
      <article id="editText"  v-if="!editText">
        <div v-html="content" style="text-align: left;font-size:12px;padding:.3rem;"></div>
      </article>
      <article v-if="editText">
        <vue-editor v-model="content" style="margin-bottom: .5rem"></vue-editor>
        <el-button @click="saveContent" style="margin-bottom: .5rem;background-color: #99A9BF;">保存</el-button>
        <el-button @click="cancelSave" style="background-color: #99A9BF;color:#f2eaea;">取消</el-button>
      </article>
    </section>
  </div>
</template>

<script lang="babel">
  import { VueEditor } from 'vue2-editor'

  export default {
    data() {
      return {
        content: "",
        editBtn: "add",
        editText: false,
        newNoteBook: "",
        editNoteItem: "",
        noteBookPopover: false,
        notePopover: true,
        editNoteContent: "",
        noteData: [],
      };
    },
    created() {
      this.getNoteBooks();
    },
    methods: {
      toggleStatus() {
        this.editText = !this.editText;
      },               // 是否编辑文本
      addNoteBook() {                     // 添加笔记本
        if(this.newNoteBook) {
          this.$http.post('api/personal/note/addNote',{
            label: this.newNoteBook,     //  笔记的名称
          }).then(backData => {
            if(backData.body.status == '1') {
              this.$message({
                message: backData.body.msg,
                type: 'success'
              });
              this.getNoteBooks();
            }else {
              this.$message.error(backData.body.msg);
            }
          })
          this.noteBookPopover = false;
          this.newNoteBook = "";
        }else{
          this.$message.error(
            '笔记本名称不能为空'
          )
        }
      },
      cancelAddNoteBook() {              // 取消添加笔记本
        this.noteBookPopover = false;
        this.newNoteBook = '';
      },
      addNote() {
        if(this.editNoteContent) {
          this.$http.post('api/personal/note/addNote',{
            label: this.editNoteContent,     //  笔记的名称
            code: this.editNoteItem.code,    //  笔记的code
          }).then(backData => {
            if(backData.body.status == '1') {
            this.$message({
              message: backData.body.msg,
              type: 'success'
            });
            this.getNoteBooks();
          }else {
            this.$message.error(backData.body.msg);
          }
        })
          this.noteBookPopover = false;
          this.newNoteBook = "";
        }else{
          this.$message.error(
            '笔记名称不能为空'
          )
        }
      },
      editNoteName() {
        this.$http.post('api/personal/note/editNoteName',{label: this.editNoteContent, code: this.editNoteItem.code}).then(backData => {
          if(backData.body.status == '1') {
            this.$message({
              message: backData.body.msg,
              type: 'success'
            });
            this.getNoteBooks();
          }else {
            this.$message.error(backData.body.msg)
          };
        });
      },
      deleteNote() {
        this.$http.post('api/personal/note/deleteNote',{code: this.editNoteItem.code}).then(backData => {
          if(backData.body.status == '1') {
            this.$message({
              message: backData.body.msg,
              type: 'success'
            });
            this.getNoteBooks();
          }else {
            this.$message.error(backData.body.msg);
          };
        });
      },
      getNoteBooks() {
        this.$http.get('api/personal/note/notebooks').then(backData => {
          this.noteData = backData.body.data;
        });
      },
      sureEditNote() {
        switch (this.editBtn) {
          case 'add' : this.addNote(); break;
          case 'edit' : this.editNoteName(); break;
          case 'delete' : this.deleteNote();break;
          default : this.addNote(); break;
        }
        this.editNoteContent = "";
        if(this.editNoteItem.code.length === 6){
          this.editBtn = "edit";
        }else {
          this.editBtn = "add";
        }
      },
      cancelEditNote() {
        this.editNoteContent = "";
        if(this.editNoteItem.code.length === 6){
          this.editBtn = "edit";
        }else {
          this.editBtn = "add";
        }
      },
      nodeClick(data, node, vNode) {
        this.$refs.tree.$el.querySelectorAll('.edit').forEach((item) => {
          item.style.display = 'none';
          this.editNoteItem = data;
          if(this.editNoteItem.code.length === 6){
            this.editBtn = "edit";
            this.$http.post('api/personal/note/getNoteContent', {code: this.editNoteItem.code}).then(backData => {
              if(backData.body.status != '1') {
                this.$message.error(backData.body.msg)
              } else{
                this.content = backData.body.text;
              }
            })
          }else {
            this.editBtn = "add";
          }
        });
        vNode.$el.querySelector('.el-tree-node__content .edit').style.display = 'inline-block';
      },
      renderContent(h, {node}) {
        const self = this;
        if(this.editNoteItem && this.editNoteItem.code.length === 6){
          if(this.editBtn == 'delete') {
            return (
              h('span', null, [
                h('span', null, node.label),
                h('span', {
                  style: {
                    float:'right',
                    'margin-right':'.3rem',
                    display: 'none',
                  },
                  class: {
                    'edit':true,
                  },
                }, [
                  h('el-popover', {
                    ref: "note",
                    attrs: {
                      placement: "right",
                      trigger: "hover",
                      width:60,
                      'popper-class': "el-popover-1"
                    },
                    style: {
                      padding: 0,
                    },
                  },[
                    h('el-button',{
                      class: {
                        'el-icon-edit': true,
                        'edit-active' : this.editBtn === "edit",
                      },
                      attrs: {
                        title: '编辑',
                      },
                      style: {
                        padding:'0 5px',
                        border: 'none',
                        'font-size':'.8rem'
                      },
                      nativeOn: {
                        click: () => {
                        this.editBtn = 'edit';
                      }
                    }
                  }),
                  h('el-button',{
                    class: {
                      'el-icon-minus': true,
                      'edit-active' : this.editBtn === "delete",
                    },
                    attrs: {
                      title: '删除',
                    },
                    style: {
                      padding:'0 5px',
                      border: 'none',
                    },
                    nativeOn: {
                      click: () => {
                      this.editBtn = 'delete';
                    }
                  }
                }),
                h('span',{                                       // render函数没有与v-model 相应的 api
                  style: {
                    width: '95px',
                    margin: '.2rem 0 0 .1rem',
                    display: 'inline-block',
                    padding:'.2rem',
                    height:'14px',
                    color:'red',
                    'line-height':'14px'
                  },
                  domProps: {
                    innerHTML: '确定删除该笔记吗？'
                  },
                }),
                  h('el-button',{
                    class: '',
                    style: {
                      padding:'0 5px',
                      border: 'none',
                      color: 'green',
                      'font-size': '12px',
                    },
                    domProps: {
                      innerHTML: '确定'
                    },
                    nativeOn: {
                      click: () => this.sureEditNote(),
                  },
              }),
              h('el-button',{
                class: '',
                style: {
                  padding: '5px 5px 2px 5px',
                  border: 'none',
                  color: 'red',
                  'font-size': '12px',
                },
                domProps: {
                  innerHTML: '取消'
                },
                nativeOn: {
                  click: () => this.cancelEditNote(),
              },
            })
          ]),
            h('el-button', {
              attrs: {
                size: 'mini',
              },
              'directives': [{
                name: 'popover',
                arg: 'note',
                value: 'note',
              }],
              'class': {
                'el-icon-setting': true
              },
              style: {
                border: 'none',
                'background-color':'transparent',
              }
            })
          ]),
          ])
          );
          } else {
            return (
              h('span', null, [
                h('span', null, node.label),
                h('span', {
                  style: {
                    float:'right',
                    'margin-right':'.3rem',
                    display: 'none',
                  },
                  class: {
                    'edit':true,
                  },
                }, [
                  h('el-popover', {
                    ref: "note",
                    attrs: {
                      placement: "right",
                      trigger: "hover",
                      width:60,
                      'popper-class': "el-popover-1"
                    },
                    style: {
                      padding: 0,
                    },
                  },[
                    h('el-button',{
                      class: {
                        'el-icon-edit': true,
                        'edit-active' : this.editBtn === "edit",
                      },
                      attrs: {
                        title: '编辑',
                      },
                      style: {
                        padding:'0 5px',
                        border: 'none',
                        'font-size':'.8rem'
                      },
                      nativeOn: {
                        click: () => {
                        this.editBtn = 'edit';
          }
          }
          }),
            h('el-button',{
              class: {
                'el-icon-minus': true,
                'edit-active' : this.editBtn === "delete",
              },
              attrs: {
                title: '删除',
              },
              style: {
                padding:'0 5px',
                border: 'none',
              },
              nativeOn: {
                click: () => {
                this.editBtn = 'delete';
          }
          }
          }),
            h('input',{                                       // render函数没有与v-model 相应的 api
              class: '',
              style: {
                width: '95px',
                margin: '.2rem 0 0 .1rem',
                padding:'.2rem',
                height:'14px',
                'line-height':'14px'
              },
              domProps: {
                value: self.editNoteContent
              },
              on: {
                input (event) {
                  self.editNoteContent = event.target.value
                }
              }
            }),
              h('el-button',{
                class: '',
                style: {
                  padding:'0 5px',
                  border: 'none',
                  color: 'green',
                  'font-size': '12px',
                },
                domProps: {
                  innerHTML: '确定'
                },
                nativeOn: {
                  click: () => this.sureEditNote(),
              },
          }),
            h('el-button',{
              class: '',
              style: {
                padding: '5px 5px 2px 5px',
                border: 'none',
                color: 'red',
                'font-size': '12px',
              },
              domProps: {
                innerHTML: '取消'
              },
              nativeOn: {
                click: () => this.cancelEditNote(),
            },
          })
          ]),
            h('el-button', {
              attrs: {
                size: 'mini',
              },
              'directives': [{
                name: 'popover',
                arg: 'note',
                value: 'note',
              }],
              'class': {
                'el-icon-setting': true
              },
              style: {
                border: 'none',
                'background-color':'transparent',
              }
            })
          ]),
          ])
          );
          }
        } else{
          if(this.editBtn == 'delete') {
            return (
              h('span', null, [
                h('span', null, node.label),
                h('span', {
                  style: {
                    float:'right',
                    'margin-right':'.3rem',
                    display: 'none',
                  },
                  class: {
                    'edit':true,
                  },
                }, [
                  h('el-popover', {
                    ref: "note",
                    attrs: {
                      placement: "right",
                      trigger: "hover",
                      width:60,
                      'popper-class': "el-popover-1"
                    },
                    style: {
                      padding: 0,
                    },
                  },[
                    h('el-button',{
                      class: {
                        'el-icon-edit': true,
                        'edit-active' : this.editBtn === "edit",
                      },
                      attrs: {
                        title: '编辑',
                      },
                      style: {
                        padding:'0 5px',
                        border: 'none',
                        'font-size':'.8rem'
                      },
                      nativeOn: {
                        click: () => {
                        this.editBtn = 'edit';
          }
          }
          }),
            h('el-button',{
              class: {
                'el-icon-plus': true,
                'edit-active' : this.editBtn === "add",
              },
              attrs: {
                title: '添加',
              },
              style: {
                padding:'0 5px',
                border: 'none',
              },
              nativeOn: {
                click: () => {
                this.editBtn = 'add';
          }
          }
          }),
            h('el-button',{
              class: {
                'el-icon-minus': true,
                'edit-active' : this.editBtn === "delete",
              },
              attrs: {
                title: '删除',
              },
              style: {
                padding:'0 5px',
                border: 'none',
              },
              nativeOn: {
                click: () => {
                this.editBtn = 'delete';
          }
          }
          }),
            h('span',{                                       // render函数没有与v-model 相应的 api
              style: {
                width: '95px',
                margin: '.2rem 0 0 .1rem',
                display: 'inline-block',
                padding:'.2rem',
                height:'14px',
                color:'red',
                'line-height':'14px'
              },
              domProps: {
                innerHTML: '确定删除该笔记吗？'
              },
            }),
              h('el-button',{
                class: '',
                style: {
                  padding:'0 5px',
                  border: 'none',
                  color: 'green',
                  'font-size': '12px',
                },
                domProps: {
                  innerHTML: '确定'
                },
                nativeOn: {
                  click: () => this.sureEditNote(),
              },
          }),
            h('el-button',{
              class: '',
              style: {
                padding: '5px 5px 2px 5px',
                border: 'none',
                color: 'red',
                'font-size': '12px',
              },
              domProps: {
                innerHTML: '取消'
              },
              nativeOn: {
                click: () => this.cancelEditNote(),
            },
          })
          ]),
            h('el-button', {
              attrs: {
                size: 'mini',
              },
              'directives': [{
                name: 'popover',
                arg: 'note',
                value: 'note',
              }],
              'class': {
                'el-icon-setting': true
              },
              style: {
                border: 'none',
                'background-color':'transparent',
              }
            })
          ]),
          ])
          );
          } else {
            return (
              h('span', null, [
                h('span', null, node.label),
                h('span', {
                  style: {
                    float:'right',
                    'margin-right':'.3rem',
                    display: 'none',
                  },
                  class: {
                    'edit':true,
                  },
                }, [
                  h('el-popover', {
                    ref: "note",
                    attrs: {
                      placement: "right",
                      trigger: "hover",
                      width:60,
                      'popper-class': "el-popover-1"
                    },
                    style: {
                      padding: 0,
                    },
                  },[
                    h('el-button',{
                      class: {
                        'el-icon-edit': true,
                        'edit-active' : this.editBtn === "edit",
                      },
                      attrs: {
                        title: '编辑',
                      },
                      style: {
                        padding:'0 5px',
                        border: 'none',
                        'font-size':'.8rem'
                      },
                      nativeOn: {
                        click: () => {
                        this.editBtn = 'edit';
          }
          }
          }),
            h('el-button',{
              class: {
                'el-icon-plus': true,
                'edit-active' : this.editBtn === "add",
              },
              attrs: {
                title: '添加',
              },
              style: {
                padding:'0 5px',
                border: 'none',
              },
              nativeOn: {
                click: () => {
                this.editBtn = 'add';
          }
          }
          }),
            h('el-button',{
              class: {
                'el-icon-minus': true,
                'edit-active' : this.editBtn === "delete",
              },
              attrs: {
                title: '删除',
              },
              style: {
                padding:'0 5px',
                border: 'none',
              },
              nativeOn: {
                click: () => {
                this.editBtn = 'delete';
          }
          }
          }),
            h('input',{                                       // render函数没有与v-model 相应的 api
              class: '',
              style: {
                width: '95px',
                margin: '.2rem 0 0 .1rem',
                padding:'.2rem',
                height:'14px',
                'line-height':'14px'
              },
              domProps: {
                value: self.editNoteContent
              },
              on: {
                input (event) {
                  self.editNoteContent = event.target.value
                }
              }
            }),
              h('el-button',{
                class: '',
                style: {
                  padding:'0 5px',
                  border: 'none',
                  color: 'green',
                  'font-size': '12px',
                },
                domProps: {
                  innerHTML: '确定'
                },
                nativeOn: {
                  click: () => this.sureEditNote(),
              },
          }),
            h('el-button',{
              class: '',
              style: {
                padding: '5px 5px 2px 5px',
                border: 'none',
                color: 'red',
                'font-size': '12px',
              },
              domProps: {
                innerHTML: '取消'
              },
              nativeOn: {
                click: () => this.cancelEditNote(),
            },
          })
          ]),
            h('el-button', {
              attrs: {
                size: 'mini',
              },
              'directives': [{
                name: 'popover',
                arg: 'note',
                value: 'note',
              }],
              'class': {
                'el-icon-setting': true
              },
              style: {
                border: 'none',
                'background-color':'transparent',
              }
            })
          ]),
          ])
          );
          }
        }



      },
      saveContent() {
        this.editText = false;
        this.$http.post('/api/personal/note/saveContent',{code: this.editNoteItem.code, text: this.content}).then(backData => {
          if(backData.body.status == '1') {
            this.$message({
              message: backData.body.msg,
              type: 'success'
            });
          }else {
            this.$message.error(backData.body.msg)
          };
        })
      },
      cancelSave() {
        this.editText = false;
        this.$http.post('/api/personal/note/getNoteContent',{code: this.editNoteItem.code}).then(backData => {
          if(backData.body.status == '1') {
            this.content = backData.body.text;
          }else {
            this.$message.error(backData.body.msg)
          };
        })
      }
    },
    components:{
      VueEditor,
    },
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #note{
    display: flex;
    min-height: 33rem;
    margin:-.5rem .5rem .5rem .5rem;

    .add-note{
      position: absolute;
      right:2rem;
      font-size: 1.5rem;
      cursor: pointer
    }

    aside{
      display: flex;
      flex-direction: column;
      width:15rem;
      text-align: left;

      .notes{
        flex:1;
        background-color: #adbbbf;
        border-right:1px solid #DDD;
        border-radius: 0 0 1.5rem 1.5rem;
      }

      header {
        height: 2.5rem;
        line-height: 2.5rem;
        position: relative;
        text-align: center;
        background-color: #EEE;
        border-radius:1.5rem 1.5rem 0 0;
      }
    }

    >section{
      flex: 1;
      position: relative;
      padding-top:2.5rem;
      background-color: transparent;

      header{
        position: absolute;
        top:0;
        width:100%;
        height:2.5rem;
        line-height: 2.5rem;
        background-color:#EEE;
        border-radius:1.5rem 1.5rem 0 0 ;
      }

      article{
        width:100%;
        height:100%;
        background-color: #adbbbf;
        /*border-radius:1.5rem;*/
      }
    }
  }

  .sure-btn{
    display: inline-block;
    color: green;
    padding-left:5px;
    cursor: pointer
  }

  .cancel-btn{
    display: inline-block;
    color: red;
    padding-left:5px;
    cursor: pointer
  }

  .el-tree{
    font-size:.85rem;
    background-color: #adbbbf;
  }
</style>
