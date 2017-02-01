import React, { Component } from 'react'
import './Editor.css'
import Profile from './Profile'
import Card from './Card'
import getEmbedly from './EmbedlyDao'

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
    //state 에 embedlyUrl, content, cardInfo를 가지도록 변경합니다
    this.state={
      embedlyUrl : undefined,
      content : undefined,
      cardInfo : undefined
    };
  }
  //embedly 서비스를 통해 카드에 들어갈 값을 가져 옵니다.
  getForcedState(embedlyUrl,content){
    return new Promise(resolve=>{
      if(embedlyUrl){
        getEmbedly(embedlyUrl).then((response)=>{
          let cardInfo = Object.assign({},response.data);
          resolve({
            embedlyUrl : embedlyUrl,
            content : content,
            cardInfo : cardInfo
          });
        }).catch((error)=>{
          resolve({
            embedlyUrl : undefined,
            content : undefined,
            cardInfo : undefined
          });
        });
      }else{
        resolve({
          content : content
        });
      }
    })
  }
  //getForcedState를 이용하도록 변경
  onPaste(event){
    event.clipboardData.items[0].getAsString(text=>{
      let checkText = this.detectURL(text);
      if(checkText){
        this.getForcedState(checkText).then((obj)=>{
          this.setState(obj);
        });
      }
    })
  }
  //getForcedState를 이용하도록 변경
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
  //아직 User를 가져 오는 부분은 바뀌지 않았음으로..
  getArticle(){
    let article = {};
    article.user = "Genji";
    article.content = this.state.content;
    if(this.state.embedlyUrl){
      article.cardInfo = this.state.cardInfo;
    }
    return article;
  }

  hasValue(value){
    if((value && (typeof value) === "string"))
      return (!value)?false:(value.trim()===""?false:true);
    else return false;
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.submit(this.getArticle());
    this.setState({
      embedlyUrl : undefined,
      content : undefined,
      cardInfo : undefined
    });
  }
  detectURL(text){
    var urls = text.match(/(https?:\/\/[^\s]+)/g)||text.match(/(www.[^\s]+)/g);
    if(urls && urls.length>0) return urls[0];
    else return undefined;
  }
  //<Card cardInfo={this.state.cardInfo}/>를 통해 값을 셋팅
  render() {
    return (
      <div className="wrapEditor">
        <Profile isAnonymous={this.props.isAnonymous}/>
        <div className="textEditor">
          <div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}
            dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            <Card cardInfo={this.state.cardInfo}/>
        </div>
        <div className="actionBar">
          <button className="upload"
            disabled={!this.hasValue(this.state.content)}
            onClick={this.handleSubmit}><span>스탠드업!</span></button>
        </div>
      </div>
    );
  }
}
export default Editor;