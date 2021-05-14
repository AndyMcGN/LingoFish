import axios from 'axios';
import React from 'react';

class SideBar extends React.Component {
  state = {
    showVocabList: true,
    showNewVocabListForm: false,
    newVocabListName: 'Vocab from ' + this.props.textTitle,
    myVocabLists: []
  }

  componentDidMount = () => {

    this.updateDisplayedVocabLists();

  }

  updateDisplayedVocabLists = () => {
    console.log('updating lists');
    
    axios.get(`http://localhost:5005/api/vocabList/myVocabLists/${this.props.user._id}`)
    .then(response => {
      const mappedLists = response.data.map(list => <li key={list._id}>{list.name} <button onClick={() => this.addWordToList(list._id)}>Add to this list</button></li>)
      this.setState({
        myVocabLists:mappedLists,
      })
    })
  }

  addWordToList = listId => {
    console.log('adding word to list')
    axios.put(`http://localhost:5005/api/vocabList/addWord/${listId}`, {word: [this.props.sourceLangWord, this.props.targetLangWord]})
    .then(response => console.log(response))

  }
  
  createVocabList = e => {

    const form = e.target;
    e.preventDefault();

    axios.post('http://localhost:5005/api/vocabList/addVocabList', 
      { name:form.name.value ,
        nativeLang: this.props.sourceLang,
        targetLang: this.props.targetLang,
        words: [[this.props.sourceLangWord, this.props.targetLangWord]],
        createdBy: this.props.user._id
      })

      this.updateDisplayedVocabLists();

      this.setState({
        newVocabListName: '',
        showVocabList: false,
        showNewVocabListForm: false,
      })
  }

  handleChange = e => {
    this.setState({
      newVocabListName: e.target.value
    })
  }

  showVocabList = () => {
    console.log('showing vocab list');
    if (!this.state.showVocabList)  this.updateDisplayedVocabLists();

    this.setState({ showVocabList: !this.state.showVocabList })
  }
  
  render() {

//     // 
// aside {
//   border: 1px black solid;
//   position: absolute;
//   height: 200px;
//   right: 0;
//   animation: sidebarReveal 0.5s ease-in-out;
// /
// class="absolute right-10 top-1/4 text-left border-4 border-black p-10 h-auto rounded-md"
    return (
      <aside >
        <div className="translation">
          <h3>{ this.props.targetLangWord }</h3>
          <h4>{ this.props.sourceLangWord }</h4>
          <p>Definition</p>
        </div>

        <button onClick={ this.showVocabList} >add to vocabulary list</button>

        <button>Already Read</button>
        {this.state.showVocabList && 
        <>
          <h3>My Lists</h3>
          { this.state.myVocabLists }

          <button onClick={() => {this.setState({ showNewVocabListForm: true })}}>Create a new Vocab list</button>
          {this.state.showNewVocabListForm && 
          <form onSubmit={this.createVocabList}>
            <label htmlFor="listName">Name of List:</label>
            <input value={ this.state.newVocabListName } onChange={this.handleChange} name="name" id="listName" />
            <button type="submit" >Submit</button>
          </form>
          
          }
       </>
       }
      </aside>
    )
  }
}

export default SideBar;
