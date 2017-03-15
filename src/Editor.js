/*global firebaseui,firebase*/
import React, { Component } from 'react';
import './Editor.css';
import Profile from './Profile';
import Card from './Card';
import getEmbedly from './EmbedlyDao';
import firebase from 'firebase';
import Tags from './tags';
import Dropdown from 'react-drop-down';
import AddCategory from './AddCategory';

class Editor extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.detectURL = this.detectURL.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getForcedState  = this.getForcedState.bind(this);
    this.tagDelete  = this.tagDelete.bind(this);
    this.tagAddition  = this.tagAddition.bind(this);
    this.tagDrag  = this.tagDrag.bind(this);

    this.state={
      embedlyUrl : undefined,
      content : undefined,
      cardInfo : undefined,
      tags : [],
      value: 'reactjs'
    };
  }

  handleChange (e) {
      this.setState({value: e})
      console.log(e);
    }

  getForcedState(embedlyUrl,content){
    return new Promise(resolve=>{
      if(embedlyUrl){
        getEmbedly(embedlyUrl).then((response)=>{
          let cardInfo = Object.assign({},response.data);
          let category =this.state.value;
          resolve({
            embedlyUrl : embedlyUrl,
            content : content,
            cardInfo : cardInfo,
            category : category
          });
        }).catch((error)=>{
          resolve({
            embedlyUrl : undefined,
            content : undefined,
            cardInfo : undefined,
            category : undefined
          });
        });
      }else{
        resolve({
          content : content
        });
      }
      console.log("getForcedState");
    })
  }
  onPaste(event){
    console.log("onPaste");
    event.clipboardData.items[0].getAsString(text=>{
      let checkText = this.detectURL(text);
      if(checkText){
        this.getForcedState(checkText).then((obj)=>{
          this.setState(obj);
        });
      }
    })
  }
  editorChange(event){
    let checkText = this.detectURL(event.currentTarget.textContent);
    if(!this.state.embedlyUrl&&
        (event.keyCode===32||event.keyCode===13)&&
        checkText){
      this.getForcedState(checkText,event.currentTarget.textContent)
          .then((obj)=>{
            this.setState(obj);
          });
    }else{
      this.getForcedState(undefined,event.currentTarget.textContent)
          .then((obj)=>{
            this.setState(obj);
          });
    }
  }
  getArticle(){
    let article = {};
    let user = firebase.auth().currentUser;
    article.user = {
        email : user.email,
        displayName : user.displayName,
        uid : user.uid
    };
    article.content = this.state.content;
    if(this.state.embedlyUrl){
      article.cardInfo = this.state.cardInfo;
    }
    article.tags = this.state.tags;
    article.value=this.state.value;
    return article;
  }
  hasValue(value){
    if((value && (typeof value) === "string"))
      return (!value)?false:(value.trim()===""?false:true);
    else return false;
  }
  handleSubmit(e){
    console.log("handleSubmit");
    e.preventDefault();
    this.props.submit(this.getArticle());

    /*
    this.setState({
      embedlyUrl : undefined,
      content : undefined,
      cardInfo : undefined,
      tags : [],
      category : undefined
    });
    */
    this.refs.innerText.textContent = "";
  }
  detectURL(text){
    var urls = text.match(/(https?:\/\/[^\s]+)/g)||text.match(/(www.[^\s]+)/g);
    if(urls && urls.length>0) return urls[0];
    else return undefined;
  }

 // tag 관련 함수
  tagDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  }
  tagAddition(tag) {
    let tags = this.state.tags;
    tags.push({
        id: tags.length + 1,
        text: tag
    });
    this.setState({tags: tags});
  }
  tagDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
  }

  render() {
    return (
      <div className="wrapEditor">
        <div className="editor_header">
          <div className="today_title">
            무엇을 공유할까요?
          </div>
          <Profile/>
        </div>
        <div className="textEditor">
          <div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}
            ref="innerText"
            // dangerouslySetInnerHTML={{__html: this.state.content}}
            ></div>
            <Card cardInfo={this.state.cardInfo}/>
        </div>



        <div className="actionBar">
          <button className="upload"
            disabled={!this.hasValue(this.state.content)}
            onClick={this.handleSubmit}><span>스탠드업!</span></button>




          <div className="Category2">
            <Dropdown value={this.state.value}
              onChange={this.handleChange.bind(this)}
              options={[ '[SELECT]','aaa', 'bbb', 'ccc', 'ddd' ]} />
          </div>
          <div>
           <AddCategory />
          </div>
        </div>


        <Tags onDelete={this.tagDelete}
          onAddition={this.tagAddition}
          onDrag={this.tagDrag}
          tags={this.state.tags}/>


      </div>

    );
  }
}
export default Editor;
